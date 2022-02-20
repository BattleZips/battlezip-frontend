import { providers } from 'ethers';
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
  provider: providers.Web3Provider | null | undefined;
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
  const [{ rawProvider, provider, chainId, address, ensName }, setWalletState] =
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
    // window.location.reload();
  }, []);

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

    const signerAddress = await ethersProvider.getSigner().getAddress();
    const signerName = await ethersProvider.lookupAddress(signerAddress);
    setWalletState({
      rawProvider: prov,
      provider: ethersProvider,
      chainId: network,
      address: signerAddress.toLowerCase(),
      ensName: signerName
    });
  }, []);

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
