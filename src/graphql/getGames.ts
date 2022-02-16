import gql from 'fake-tag';
import { BattleshipGameDetails } from './fragments';
import { CLIENTS } from './client';
import { GameStatus, GetBattlesipGamesQuery, GetBattlesipGamesQueryVariables } from './autogen/types';

const battleshipGameQuery = gql`
    query GetBattlesipGames(
        $limit: Int!
        $status: GameStatus
    ) {
        battleshipGames (
            first: $limit
            where: {status: $status}
        ) {
            ...BattleshipGameDetails
        }
    }
    ${BattleshipGameDetails}
`

export const getGames = async (chainId: number, limit: number, status: GameStatus): Promise<GetBattlesipGamesQuery | null> => {
    const { data, error } = await CLIENTS[chainId].query<GetBattlesipGamesQuery, GetBattlesipGamesQueryVariables>(battleshipGameQuery, { limit, status }).toPromise()
    if (!data) {
        if (error) {
            throw error;
        }

        return null;
    }
    return data;
}