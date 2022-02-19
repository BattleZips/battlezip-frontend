import { BigNumber, constants, Contract, providers, utils } from 'ethers';

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
  console.log('CONTRACT: ', BATTLESHIP_GAME_CONTRACT);
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
