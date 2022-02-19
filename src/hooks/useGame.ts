import { useCallback, useEffect, useState } from 'react';
import { getGame } from 'graphql/getGame';
import { useWallet } from 'contexts/WalletContext';

export const useGame = (
  isNewGame: boolean,
  id: string
): { fetching: boolean; error: Error | null; game: any | null } => {
  const { chainId } = useWallet();
  const [error, setError] = useState<Error | null>(null);
  const [fetching, setFecthing] = useState(false);
  const [game, setGame] = useState<any | null>(null);

  const fetchData = useCallback(async () => {
    if (!chainId) return;
    try {
      const game = await getGame(chainId, id);
      setFecthing(true);
      setGame(game.battleshipGame);
    } catch (err) {
      setGame(null);
      setError(error as Error);
    }
  }, [error]);

  useEffect(() => {
    if (isNewGame) return;
    fetchData();
  }, [fetchData]);
  return { error, fetching, game };
};
