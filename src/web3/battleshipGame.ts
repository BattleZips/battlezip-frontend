import { Contract, providers, utils, BigNumberish } from 'ethers';

const { REACT_APP_BATTLESHIP_GAME_CONTRACT: BATTLESHIP_GAME_CONTRACT } =
  process.env;

export const createGame = async (
  ethersProvider: providers.Web3Provider,
  boardHash: BigNumberish,
  a: BigNumberish[],
  b_0: BigNumberish[],
  b_1: BigNumberish[],
  c: BigNumberish[]
) => {
  if (!BATTLESHIP_GAME_CONTRACT || !ethersProvider) return;
  const abi = new utils.Interface([
    'function newGame(uint256 _boardHash, uint256[2] a, uint256[2] b_0, uint256[2] b_1, uint256[2] c,) external'
  ]);
  const contract = new Contract(
    BATTLESHIP_GAME_CONTRACT,
    abi,
    ethersProvider.getSigner()
  );
  return contract.newGame(boardHash, a, b_0, b_1, c);
};

export const getGameIndex = async (ethersProvider: providers.Web3Provider) => {
  if (!BATTLESHIP_GAME_CONTRACT || !ethersProvider) return;
  const abi = new utils.Interface([
    'function gameIndex() external view returns(uint256)'
  ]);
  const contract = new Contract(
    BATTLESHIP_GAME_CONTRACT,
    abi,
    ethersProvider.getSigner()
  );
  return contract.gameIndex();
};

export const joinGame = async (
  ethersProvider: providers.Web3Provider,
  gameId: number,
  boardHash: BigNumberish,
  a: BigNumberish[],
  b_0: BigNumberish[],
  b_1: BigNumberish[],
  c: BigNumberish[]
) => {
  if (!BATTLESHIP_GAME_CONTRACT || !ethersProvider) return;
  const abi = new utils.Interface([
    'function joinGame(uint256 _game, uint256 _boardHash, uint256[2] a, uint256[2] b_0, uint256[2] b_1, uint256[2] c,) external'
  ]);
  const contract = new Contract(
    BATTLESHIP_GAME_CONTRACT,
    abi,
    ethersProvider.getSigner()
  );
  return contract.joinGame(gameId, boardHash, a, b_0, b_1, c);
};

export const playingGame = async (
  ethersProvider: providers.Web3Provider,
  player: string
) => {
  if (!BATTLESHIP_GAME_CONTRACT || !ethersProvider) return;
  const abi = new utils.Interface([
    'function playing(address player) public view returns(uint256)'
  ]);
  const contract = new Contract(BATTLESHIP_GAME_CONTRACT, abi, ethersProvider);
  return contract.playing(player);
};

export const firstTurn = async (
  ethersProvider: providers.Web3Provider,
  gameId: number,
  shot: number[]
) => {
  if (!BATTLESHIP_GAME_CONTRACT || !ethersProvider) return;
  const abi = new utils.Interface([
    'function firstTurn(uint256 _game, uint[2] memory _shot) external'
  ]);
  const contract = new Contract(
    BATTLESHIP_GAME_CONTRACT,
    abi,
    ethersProvider.getSigner()
  );
  return contract.firstTurn(gameId, shot);
};

export const turn = async (
  ethersProvider: providers.Web3Provider,
  gameId: number,
  hit: boolean,
  next: number[],
  a: BigNumberish[],
  b_0: BigNumberish[],
  b_1: BigNumberish[],
  c: BigNumberish[]
) => {
  if (!BATTLESHIP_GAME_CONTRACT || !ethersProvider) return;
  console.log('GAME ID: ', gameId);
  const abi = new utils.Interface([
    'function turn(uint256 _game, bool _hit, uint[2] memory _next, uint[2] memory a, uint[2] memory b_0, uint[2] memory b_1, uint[2] memory c) external'
  ]);
  const contract = new Contract(
    BATTLESHIP_GAME_CONTRACT,
    abi,
    ethersProvider.getSigner()
  );
  return contract.turn(gameId, hit, next, a, b_0, b_1, c);
};
