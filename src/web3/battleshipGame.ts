import { Contract, providers, utils } from 'ethers';

const { REACT_APP_BATTLESHIP_GAME_CONTRACT: BATTLESHIP_GAME_CONTRACT } =
  process.env;

export const createGame = async (
  ethersProvider: providers.Web3Provider,
  boardHash: number,
  a: number[],
  b_0: number[],
  b_1: number[],
  c: number[]
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

export const joinGame = async (
  ethersProvider: providers.Web3Provider,
  gameId: number,
  boardHash: number,
  a: number[],
  b_0: number[],
  b_1: number[],
  c: number[]
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
  const contract = new Contract(
    BATTLESHIP_GAME_CONTRACT,
    abi,
    ethersProvider
  );
  return contract.playing(player);
};
