// import WalletConnectProvider from '@walletconnect/web3-provider';
import { IProviderOptions } from 'web3modal';

export const providerOptions: IProviderOptions = {
  // walletconnect: {
  //   package: WalletConnectProvider,
  //   options: {
  //     rpc: {
  //       1: process.env.REACT_APP_MAINNET_RPC,
  //       4: process.env.REACT_APP_RINKEBY_RPC
  //     }
  //   }
  // }
  /*'custom-torus-rinkeby': {
    display: {
      logo: TorusLogo,
      name: 'Torus Rinkeby',
      description: 'Connect your Torus account',
    },
    package: Torus,
    options: {
      network: 'rinkeby',
    },
    connector: connectors.torus,
  },
  'custom-torus-mainnet': {
    display: {
      logo: TorusLogo,
      name: 'Torus Mainnet',
      description: 'Connect your Torus account',
    },
    package: Torus,
    options: {
      network: 'mainnet',
    },
    connector: connectors.torus,
  },
  'custom-walletlink-rinkeby': {
    display: {
      logo: CoinbaseLogo,
      name: 'Coinbase Rinkeby',
      description: 'Scan with WalletLink to connect',
    },
    options: {
      appName: 'Rigor',
      networkUrl: process.env.REACT_APP_RINKEBY_RPC,
      chainId: 4,
    },
    package: WalletLink,
    connector: async (_: unknown, options: ConnectorOptions) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
  'custom-walletlink-mainnet': {
    display: {
      logo: CoinbaseLogo,
      name: 'Coinbase Mainnet',
      description: 'Scan with WalletLink to connect',
    },
    options: {
      appName: 'Rigor',
      networkUrl: process.env.REACT_APP_MAINNET_RPC,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_: unknown, options: ConnectorOptions) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },*/
};
