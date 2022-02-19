import gql from 'fake-tag';
import { BattleshipGameDetails } from './fragments';
import { CLIENTS } from './client';
import {
  GameStatus,
  GetBattleshipGamesQuery,
  GetBattleshipGamesQueryVariables
} from './autogen/types';

const battleshipGameQuery = gql`
  query GetBattleshipGames($limit: Int!, $status: GameStatus!) {
    battleshipGames(first: $limit, where: { status: $status }) {
      ...BattleshipGameDetails
    }
  }
  ${BattleshipGameDetails}
`;

export const getGames = async (
  chainId: number,
  limit: number,
  status: GameStatus
): Promise<GetBattleshipGamesQuery | null> => {
  const { data, error } = await CLIENTS[chainId]
    .query<GetBattleshipGamesQuery, GetBattleshipGamesQueryVariables>(
      battleshipGameQuery,
      { limit, status }
    )
    .toPromise();
  if (!data) {
    if (error) {
      throw error;
    }

    return null;
  }
  return data;
};
