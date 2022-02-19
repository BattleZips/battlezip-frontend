import gql from 'fake-tag';
import { BattleshipGameDetails } from './fragments';
import { CLIENTS } from './client';

const battleshipGameQuery = gql`
  query GetBattleshipGame($id: ID!) {
    battleshipGame(id: $id) {
      ...BattleshipGameDetails
    }
  }
  ${BattleshipGameDetails}
`;

export const getGame = async (
  chainId: number,
  id: String
): Promise<any | null> => {
  const { data, error } = await CLIENTS[chainId]
    .query<any, any>(battleshipGameQuery, { id })
    .toPromise();
  if (!data) {
    if (error) {
      throw error;
    }

    return null;
  }
  return data;
};
