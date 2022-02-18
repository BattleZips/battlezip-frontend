type StringInfo = {
  [chainId: number]: string;
};

export enum GameStatus {
  STARTED = 'STARTED',
  JOINED = 'JOINED',
  OVER = 'OVER'
}

export const SUBGRAPH_URLS: StringInfo = {
  4: 'https://api.thegraph.com/subgraphs/name/ian-bright/zk_battleship_rinkeby'
};
