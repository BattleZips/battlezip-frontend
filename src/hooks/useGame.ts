import { useCallback, useEffect, useState } from 'react';
import { getGame } from 'graphql/getGame';
import { useWallet } from 'contexts/WalletContext';

export const useGame = (
  id: string
): { fetching: boolean; error: Error | null; game: any | null } => {
  const { chainId } = useWallet();
  const [error, setError] = useState<Error | null>(null);
  const [fetching, setFecthing] = useState(true);
  const [game, setGame] = useState<any | null>(null);

  const fetchData = useCallback(async () => {
    if (!chainId) return;
    try {
      setFecthing(true);
      const game = await getGame(chainId, id);
      setGame(game.battleshipGame);
    } catch (err) {
      setGame(null);
      setError(error as Error);
    } finally {
      setFecthing(false);
    }
  }, [chainId, error]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { error, fetching, game };
};
