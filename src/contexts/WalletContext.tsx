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
  rawProvider: providers.Provider | null | undefined;
  fallbackProvider: providers.Web3Provider | null | undefined; // ethers provider
  provider: providers.Web3Provider | null | undefined; // biconomy provider
  chainId: number | null | undefined;
  address: string | null | undefined;
  // authToken: string | null | undefined;
  ensName: string | null | undefined;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  isMetamask: boolean;
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
  theme: 'dark'
});

export const WalletContext = createContext<WalletContextType>({
  rawProvider: null,
  fallbackProvider: null,
  provider: null,
  chainId: null,
  address: null,
  ensName: null,
  connectWallet: async () => {
    return;
  },
  disconnect: () => undefined,
  isConnecting: true,
  isConnected: false,
  isMetamask: false
});

type WalletStateType = {
  rawProvider?: providers.Provider | null;
  fallbackProvider?: providers.Web3Provider | null;
  provider?: providers.Web3Provider | null;
  chainId?: number | null;
  address?: string | null;
  authToken?: string | null;
  ensName?: string | null;
};

const isMetamaskProvider = (
  provider: providers.Web3Provider | null | undefined
) => provider?.connection?.url === 'metamask';

export const WalletProvider: React.FC = ({ children }) => {
  const [{ rawProvider, fallbackProvider, provider, chainId, address, ensName }, setWalletState] =
    useState<WalletStateType>({});

  const isConnected: boolean = useMemo(
    () => !!provider && !!address && !!chainId,
    [provider, address, chainId]
  );

  const [isConnecting, setConnecting] = useState<boolean>(true);
  const isMetamask = useMemo(() => isMetamaskProvider(provider), [provider]);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();
    setWalletState({});
  }, []);

  const setBiconomyProvider = useCallback(async (prov): Promise<providers.Web3Provider | null> => {
    const biconomy = new window.Biconomy(prov, {
      apiKey: process.env.REACT_APP_BICONOMY_API,
      debug: true
    })
    try {
      const res: providers.Web3Provider | null = await new Promise((resolve, reject) => {
        biconomy
          .onEvent(biconomy.READY, () => resolve(new ethers.providers.Web3Provider(biconomy)))
          .onEvent(biconomy.ERROR, (err: Error) => reject(err))
      })
      return res
    } catch (err) {
      console.log("Biconomy mexa integration failed: ", err)
      return null
    }
  }, [])

  const setWalletProvider = useCallback(async (prov) => {
    const ethersProvider = new providers.Web3Provider(prov);
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
    const biconomyProvider = await setBiconomyProvider(ethersProvider);
    // TODO: Move to better location
    const isPolygonChain = network === 137 || network === 80001;
    const signerAddress = await ethersProvider.getSigner().getAddress();
    const signerName = !isPolygonChain
      ? await ethersProvider.lookupAddress(signerAddress)
      : '';
    setWalletState({
      rawProvider: prov,
      fallbackProvider: null,
      provider: ethersProvider,
      chainId: network,
      address: signerAddress.toLowerCase(),
      ensName: signerName
    });
  }, [setBiconomyProvider]);

  const connectWallet = useCallback(async () => {
    try {
      setConnecting(true);
      const modalProvider = await (async () => {
        const choosenProvider = await web3Modal.connect();
        await setWalletProvider(choosenProvider);

        return choosenProvider;
      })();
      modalProvider.on('accountsChanged', () => {
        disconnect();
      });
      modalProvider.on('chainChanged', () => {
        disconnect();
      });
    } catch (web3Error) {
      // eslint-disable-next-line no-console
      console.error(web3Error);
      disconnect();
    } finally {
      setConnecting(false);
    }
  }, [setWalletProvider, disconnect]);

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
        rawProvider,
        fallbackProvider,
        provider,
        address,
        chainId,
        ensName,
        connectWallet,
        isConnected,
        isConnecting,
        disconnect,
        isMetamask
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => useContext(WalletContext);
