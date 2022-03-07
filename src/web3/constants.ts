const {
  REACT_APP_MAINNET_RPC: MAINNET_RPC,
  REACT_APP_RINKEBY_RPC: RINKEBY_RPC,
  REACT_APP_GOERLI_RPC: GOERLI_RPC,
  REACT_APP_BATTLESHIP_GAME_CONTRACT_GOERLI: BATTLESHIP_GAME_CONTRACT_GOERLI,
  REACT_APP_BATTLESHIP_GAME_CONTRACT_MUMBAI: BATTLESHIP_GAME_CONTRACT_MUMBAI,
  REACT_APP_BATTLESHIP_GAME_CONTRACT_POLYGON: BATTLESHIP_GAME_CONTRACT_POLYGON,
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

export const BATTLESHIP_GAME_CONTRACT: { [key: number]: string } = {
  5: BATTLESHIP_GAME_CONTRACT_GOERLI || '',
  137: BATTLESHIP_GAME_CONTRACT_POLYGON || '',
  80001: BATTLESHIP_GAME_CONTRACT_MUMBAI || '',
}

export const TESTNET_CHAIN_IDS = [4, 5, 80001];

export const RPC_URLS: StringInfo = {
  1: MAINNET_RPC || 'TODO',
  4: RINKEBY_RPC || 'TODO',
  5: GOERLI_RPC || 'TODO',
};

export const EXPLORER_URLS: StringInfo = {
  1: 'https://etherscan.io',
  4: 'https://rinkeby.etherscan.io',
  5: 'https://goerli.etherscan.io',
  137: 'https://polygonscan.com',
  80001: 'https://mumbai.polygonscan.com'
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
  },
  137: {
    name: 'Polygon',
    symbol: 'MATIC'
  },
  80001: {
    name: 'Polygon Mumbai',
    symbol: 'MATIC'
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
  5: 'https://api.thegraph.com/subgraphs/name/ian-bright/battlezips_goerli',
  137: 'https://api.thegraph.com/subgraphs/name/ian-bright/battlezips_polygon', //placeholder
  80001: 'https://api.thegraph.com/subgraphs/name/ian-bright/battlezips_mumbai'
};

export const NETWORK_NAMES: StringInfo = {
  1: 'Ethereum Mainnet',
  4: 'Rinkeby Testnet',
  5: 'Goerli Testnet',
  137: 'Polygon Mainnet',
  80001: 'Polygon Mumbai Testnet'
};

export const SUPPORTED_NETWORKS: number[] = [80001];

export const DEFAULT_NETWORK = SUPPORTED_NETWORKS[0];
