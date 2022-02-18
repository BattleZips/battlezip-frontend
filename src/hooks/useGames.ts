import { useCallback, useEffect, useState } from 'react';
import { BattleshipGame } from 'graphql/autogen/types';
import { getGames } from 'graphql/getGames';
import { GameStatus, GetBattlesipGamesQuery } from 'graphql/autogen/types';

export const useGames = (
  limit = 1000,
  status: GameStatus
): {
  fetching: boolean;
  error: Error | null;
  games: GetBattlesipGamesQuery | null;
} => {
  // TODO: Take out hardcoding
  const chainId = 4;
  const [error, setError] = useState<Error | null>(null);
  const [fetching, setFecthing] = useState(false);
  const [games, setGames] = useState<GetBattlesipGamesQuery | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setFecthing(true);
      const res = await getGames(chainId, limit, status);
      setGames(res);
    } catch (err) {
      setGames(null);
      setError(error as Error);
    }
  }, [chainId, error, limit, status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { error, fetching, games };
};
