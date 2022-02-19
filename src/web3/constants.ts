const {
  REACT_APP_MAINNET_RPC: MAINNET_RPC,
  REACT_APP_RINKEBY_RPC: RINKEBY_RPC,
  REACT_APP_GOERLI_RPC: GOERLI_RPC
} = process.env;

type StringInfo = {
  [chainId: number]: string;
};

type CurrencyInfo = {
  [chainId: number]: {
    name: string;
    symbol: string;
  };
};

export const RPC_URLS: StringInfo = {
  1: MAINNET_RPC || '',
  4: RINKEBY_RPC || '',
  5: GOERLI_RPC || ''
};

export const EXPLORER_URLS: StringInfo = {
  1: 'https://etherscan.io',
  4: 'https://rinkeby.etherscan.io',
  5: 'https://goerli.etherscan.io'
};

export const NETWORK_CURRENCIES: CurrencyInfo = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH'
  },
  4: {
    name: 'Ethereum',
    symbol: 'ETH'
  },
  5: {
    name: 'Ethereum',
    symbol: 'ETH'
  }
};

export enum GameStatus {
  Joined = 'JOINED',
  Over = 'OVER',
  Started = 'STARTED'
}

export const SUBGRAPH_URLS: StringInfo = {
  1: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  4: 'https://api.thegraph.com/subgraphs/name/ian-bright/zk_battleship_rinkeby',
  5: 'https://api.thegraph.com/subgraphs/name/ian-bright/battlezips_goerli'
};

export const NETWORK_NAMES: StringInfo = {
  1: 'ETH Mainnet',
  4: 'Rinkeby Testnet',
  5: 'Goerli Testnet'
};

export const SUPPORTED_NETWORKS: number[] = [5];

export const DEFAULT_NETWORK = SUPPORTED_NETWORKS[0];
