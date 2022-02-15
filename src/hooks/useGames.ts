import { useCallback, useEffect, useState } from 'react';
import { BattleshipGame } from "graphql/autogen/types";
import { getGames } from "graphql/getGames";


export const useGames = (
    limit = 1000,
    status: string
): { fetching: boolean; error: Error | null; games: Array<BattleshipGame> } => {
    // TODO: Take out hardcoding
    const chainId = 4;
    const [error, setError] = useState<Error | null>(null);
    const [fetching, setFecthing] = useState(false);
    const [games, setGames] = useState<Array<BattleshipGame>>([]);

    const fetchData = useCallback(async () => {
        try {
            setFecthing(true);
            const res = await getGames(chainId, limit, status);
            setGames(res);
        } catch (err) {
            setGames([]);
            setError(error as Error);
        }
    }, [chainId, error, limit, status])

    useEffect(() => {
        fetchData();
    }, [fetchData])
    return { error, fetching, games };
}