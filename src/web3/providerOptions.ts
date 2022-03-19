// import WalletConnectProvider from '@walletconnect/web3-provider';
import { IProviderOptions } from 'web3modal';

export const providerOptions: IProviderOptions = {
  torus: {
    package: window.Torus,
    options: {
      networkParams: {
        host: 'https://matic-mumbai.chainstacklabs.com',
        chainId: 80001,
        networkName: 'mumbai'
      },
    }
  }
};
