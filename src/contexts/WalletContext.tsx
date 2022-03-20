import { ethers, providers } from 'ethers';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import Web3Modal from 'web3modal';
import { providerOptions } from 'web3/providerOptions';
import { isSupportedChain } from 'web3/helpers';
import { DEFAULT_NETWORK, NETWORK_NAMES } from 'web3/constants';
import { switchChainOnMetaMask } from 'web3/metamask';

export type WalletContextType = {
  provider: providers.Web3Provider | null | undefined; // ethers provider
  biconomy: any; // biconomy object
  chainId: number | null | undefined; // network id
  address: string | null | undefined; // signer public key
  // authToken: string | null | undefined;
  ensName: string | null | undefined; // public key ENS resolution
  connectWallet: () => Promise<void>; // connect an eip1193 object
  disconnect: () => void; // disconnect an eip1193 object
  isConnecting: boolean;
  isConnected: boolean;
  isMetamask: boolean;
  isBiconomy: boolean;
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
  theme: 'dark'
});

export const WalletContext = createContext<WalletContextType>({
  provider: null,
  biconomy: null,
  chainId: null,
  address: null,
  ensName: null,
  connectWallet: async () => { return },
  disconnect: () => undefined,
  isConnecting: true,
  isConnected: false,
  isMetamask: false,
  isBiconomy: false
});

type WalletStateType = {
  provider?: providers.Web3Provider | null;
  biconomy?: any | null;
  chainId?: number | null;
  address?: string | null;
  authToken?: string | null;
  ensName?: string | null;
};

const isMetamaskProvider = (
  provider: providers.Web3Provider | null | undefined
) => provider?.connection?.url === 'metamask';

const isBiconomyProvider = (
  biconomy: typeof window.Biconomy | null | undefined
) => biconomy?.isBiconomy === true && biconomy?.status === 'biconomy_ready';

export const WalletProvider: React.FC = ({ children }) => {
  const [
    {
      provider,
      biconomy,
      chainId,
      address,
      ensName
    },
    setWalletState
  ] = useState<WalletStateType>({});

  const isConnected: boolean = useMemo(
    () => !!provider && !!address && !!chainId,
    [provider, address, chainId]
  );

  const [isConnecting, setConnecting] = useState<boolean>(true);
  const isMetamask = useMemo(() => isMetamaskProvider(provider), [provider]);
  const isBiconomy = useMemo(() => isBiconomyProvider(biconomy), [biconomy]);
  console.log('isBiconomy: ', isBiconomy)
  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();
    setWalletState({});
    window.location.reload();
  }, []);

  const addMetaMaskListeners = useCallback(
    (modalProvider: any) => {
      modalProvider.on('accountsChanged', () => {
        disconnect();
      });
      modalProvider.on('chainChanged', () => {
        disconnect();
      });
    },
    [disconnect]
  );

  /**
   * Set the EIP-1193 Compliant web3 Provider with Signer in context
   * 
   * @param _provider - the eip1193 object being set
   */
  const setWalletProvider = useCallback(async (_provider) => {
    const ethersProvider = new providers.Web3Provider(_provider);
    await ethersProvider.ready;
    const providerNetwork = await ethersProvider.getNetwork();
    let network = Number(providerNetwork.chainId);
    if (!isSupportedChain(network)) {
      const success =
        isMetamaskProvider(ethersProvider) &&
        (await switchChainOnMetaMask(DEFAULT_NETWORK));
      if (!success) {
        const errorMsg = `Network not supported, please switch to ${NETWORK_NAMES[DEFAULT_NETWORK]}`;
        // toast.error(errorMsg);
        throw new Error(errorMsg);
      }
      network = DEFAULT_NETWORK;
    }
    const biconomy = new window.Biconomy(_provider, {
      strictMode: true,
      apiKey: process.env.REACT_APP_BICONOMY_API,
      debug: true
    });
    try {
      new Promise((resolve, reject) => {
        biconomy
          .onEvent(biconomy.READY, () => {
            resolve(0);
          })
          .onEvent(biconomy.ERROR, (err: Error) => reject(err));
      });
    } catch (err) {
      // TODO: handle switch to non-metatransactions gracefully
      throw new Error('Biconomy failed to connect');
    }
    // TODO: Move to better location
    const isPolygonChain = network === 137 || network === 80001;
    const signerAddress = await ethersProvider.getSigner().getAddress();
    const signerName = !isPolygonChain
      ? await ethersProvider.lookupAddress(signerAddress)
      : '';
    setWalletState({
      provider: ethersProvider,
      biconomy,
      chainId: network,
      address: signerAddress.toLowerCase(),
      ensName: signerName
    });
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      setConnecting(true);
      const modalProvider = await (async () => {
        const chosenProvider = await web3Modal.connect();
        await setWalletProvider(chosenProvider);
        return chosenProvider;
      })();
      if (modalProvider.isMetaMask) addMetaMaskListeners(modalProvider);
    } catch (web3Error) {
      // eslint-disable-next-line no-console
      console.error(web3Error);
      disconnect();
    } finally {
      setConnecting(false);
    }
  }, [addMetaMaskListeners, setWalletProvider, disconnect]);

  useEffect(() => {
    const load = async () => {
      if (web3Modal.cachedProvider) {
        await connectWallet();
      } else {
        setConnecting(false);
      }
    };
    load();
  }, [connectWallet]);

  return (
    <WalletContext.Provider
      value={{
        provider,
        biconomy,
        address,
        chainId,
        ensName,
        connectWallet,
        isConnected,
        isConnecting,
        disconnect,
        isMetamask,
        isBiconomy
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => useContext(WalletContext);
