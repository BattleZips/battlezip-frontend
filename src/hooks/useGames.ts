import { useCallback, useEffect, useState } from 'react';
import { getGames } from 'graphql/getGames';
import { Game } from 'views/Home/types';
// import { getENSDomains } from 'graphql/getENSNames';
import { useWallet } from 'contexts/WalletContext';
import { GameStatus } from 'graphql/autogen/types';
import useInterval from './useInterval';

export const useGames = (
  limit = 1000,
  status: GameStatus,
  isPlaying: boolean
): {
  fetching: boolean;
  error: Error | null;
  games: Array<Game> | null;
  refreshCount: number;
} => {
  const { chainId } = useWallet();
  const [error, setError] = useState<Error | null>(null);
  const [fetching, setFecthing] = useState(true);
  const [games, setGames] = useState<Array<Game> | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const fetchData = useCallback(async () => {
    if (!chainId || isPlaying) return;
    try {
      setFecthing(true);
      const res = (await getGames(chainId, limit, status)) as any;
      // const addresses = res.battleshipGames.map((game: any) => game.startedBy);
      // const ensDomains =
      //   (await getENSDomains(limit, addresses))?.accounts.map(
      //     (account: any) => ({
      //       [account.domains[0].owner.id]: account.domains[0].name
      //     })
      //   ) ?? [];
      // const ensObj = Object.assign({}, ...ensDomains);
      const gameArr = res.battleshipGames.map((game: any) => ({
        address: game.startedBy,
        ens: '',
        id: game.id
      }));
      setGames(gameArr);
    } catch (err) {
      setGames(null);
      setError(error as Error);
    } finally {
      setFecthing(false);
    }
  }, [chainId, error, isPlaying, limit, status]);

  const intervalFunction = () => {
    fetchData();
    setRefreshCount((prev) => prev + 1);
  };

  useInterval(intervalFunction, 15000);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return {
    error,
    fetching,
    games,
    refreshCount
  };
};
