import abi from './BattleshipGame.json';

const {
  REACT_APP_MAINNET_RPC: MAINNET_RPC,
  REACT_APP_RINKEBY_RPC: RINKEBY_RPC,
  REACT_APP_GOERLI_RPC: GOERLI_RPC,
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
  80001: BATTLESHIP_GAME_CONTRACT_MUMBAI || '',
}

export const TESTNET_CHAIN_IDS = [4, 5, 42, 80001];

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
  80001: 'https://api.thegraph.com/subgraphs/name/jp4g/battlezips-mumbai'
};

export const NETWORK_NAMES: StringInfo = {
  1: 'Ethereum Mainnet',
  4: 'Rinkeby Testnet',
  5: 'Goerli Testnet',
  137: 'Polygon Mainnet',
  80001: 'Polygon Mumbai Testnet'
};

const IPFS_PREFIX = "https://ipfs.infura.io/ipfs/"

export const IPFS_CIDS: { [key: string]: IpfsInfo } = {
  board: {
    verification_key: `${IPFS_PREFIX}QmWCeoJy8ZEmN33htuvzDUxk2YmoQqF9VymMJUzay4XdLo`,
    zkey: `${IPFS_PREFIX}QmQMfy99jyvzQ9wPSmHwYvxfXL929yjDFZ2dzyouvotBsk`,
    circuit: `${IPFS_PREFIX}QmZ274ZUF3JAAdtnCaYNr2tEDFwu4ThqG6Hkbj7rvYbiDs`
  },
  shot: {
    verification_key: `${IPFS_PREFIX}QmTVSaQvuUrqwVNT962gceEFH9UBEw1GYk2z9u3t5iAJse`,
    zkey: `${IPFS_PREFIX}QmYqPPLhPg8kjUcHLPi8FkoZQVfMHdywBhb6zWjKP4WmZ6`,
    circuit: `${IPFS_PREFIX}QmbhiRD8LYSJx4ss9DW4A2QXNh8dnJFgNdL9ofGSVr8T4o`
  }
}

export const SUPPORTED_NETWORKS: number[] = [5, 137, 80001];

export const DEFAULT_NETWORK = SUPPORTED_NETWORKS[2];
export const ABI = abi;
