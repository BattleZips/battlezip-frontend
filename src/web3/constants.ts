import abi from './BattleshipGame.json';

const {
  REACT_APP_MAINNET_RPC: MAINNET_RPC,
  REACT_APP_RINKEBY_RPC: RINKEBY_RPC,
  REACT_APP_GOERLI_RPC: GOERLI_RPC,
  REACT_APP_BATTLESHIP_GAME_CONTRACT_LOCAL: BATTLESHIP_GAME_CONTRACT_LOCAL,
  REACT_APP_BATTLESHIP_GAME_CONTRACT_GOERLI: BATTLESHIP_GAME_CONTRACT_GOERLI,
  REACT_APP_BATTLESHIP_GAME_CONTRACT_MUMBAI: BATTLESHIP_GAME_CONTRACT_MUMBAI,
  REACT_APP_BATTLESHIP_GAME_CONTRACT_POLYGON: BATTLESHIP_GAME_CONTRACT_POLYGON,
} = process.env;

type IpfsInfo = {
  verification_key: string;
  zkey: string;
  circuit: string;
}

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
  1337: BATTLESHIP_GAME_CONTRACT_LOCAL || '',
  31337: BATTLESHIP_GAME_CONTRACT_LOCAL || '',
  80001: BATTLESHIP_GAME_CONTRACT_MUMBAI || '',
}

export const TESTNET_CHAIN_IDS = [4, 5, 42, 80001];
export const BICONOMY_CHAINS = [4, 5, 137, 80001];
export const ENS_CHAINS = [4, 5];

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
  1337: '',
  31337: '',
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
  1337: {
    name: 'Localhost',
    symbol: 'ETH'
  },
  31337: {
    name: 'Localhost',
    symbol: 'ETH'
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
  1337: 'http://127.0.0.1:8000/subgraphs/name/ian-bright/zk-battleship-subgraph/graphql',
  31337: 'http://127.0.0.1:8000/subgraphs/name/ian-bright/zk-battleship-subgraph/graphql',
  80001: 'https://api.thegraph.com/subgraphs/name/ian-bright/battlezips_mumbai'
};

export const NETWORK_NAMES: StringInfo = {
  1: 'Ethereum Mainnet',
  4: 'Rinkeby Testnet',
  5: 'Goerli Testnet',
  137: 'Polygon Mainnet',
  1337: 'Localhost',
  31337: 'Localhost',
  80001: 'Polygon Mumbai Testnet'
};
const IPFS_PREFIX = "https://battlezips.infura-ipfs.io/ipfs/"

export const IPFS_CIDS: { [key: string]: IpfsInfo } = {
  board: {
    verification_key: `${IPFS_PREFIX}QmaDcGAYgCQmXTyw2kQXmTS6XNtiFG5JGu2zKmz6scdJrr`,
    zkey: `${IPFS_PREFIX}QmYYTYoK23MPNmwSs2gEtXYPdSrhUWXHGtFhC9yWDHpjpW`,
    circuit: `${IPFS_PREFIX}QmT1opMJ4UVMqwcQPghZVVhtp65wYUxn516Cn9rmnowRqs`
  },
  shot: {
    verification_key: `${IPFS_PREFIX}QmVFSihF9UcWYEpwWg6XSDzD3dXb3qMVTiBYmGwvbLTcdv`,
    zkey: `${IPFS_PREFIX}QmPkNSB7U2p1XBMmZwpXSQernMtuaXE2F34NGhNmNsPq8u`,
    circuit: `${IPFS_PREFIX}QmVfrxEzAL8BRKyE6xmmxBAQPUv75vmv53UN8V6vUJQAc1`
  }
}

export const SUPPORTED_NETWORKS: number[] = [5, 137, 1337, 31337, 80001];

export const DEFAULT_NETWORK = SUPPORTED_NETWORKS[4];
export const ABI = abi;
