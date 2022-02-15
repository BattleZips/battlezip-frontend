import gql from 'fake-tag';
import { BattleshipGameDetails } from './fragments';
import { CLIENTS } from './client';
import { BattleshipGame } from './autogen/types';

const battleshipGameQuery = gql`
    query GetBattlesipGames(
        $limit: Int!
        $status: String
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

export const getGames = async (chainId: number, limit: number, status: string): Promise<Array<BattleshipGame>> => {
    const { data, error } = await CLIENTS[chainId].query<any>(battleshipGameQuery, { chainId, limit, status }).toPromise()
    if (!data) {
        if (error) {
            throw error;
        }

        return [];
    }
    return data;
}