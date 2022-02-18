import { useCallback, useEffect, useState } from 'react';
// import { getGames } from "graphql/getGames";
// import { GameStatus, GetBattlesipGamesQuery } from 'graphql/autogen/types';
import { Game } from 'views/Home/types';
import { getENSDomains } from 'graphql/getENSNames';

const DUMMY_GAMES: Game[] = [
    { address: '0xdba24d6953dc13864138d9a652b3926082fa46aa' },
    { address: '0x85f7ac3203275936ec3d118aaae43b8307b35479' },
    { address: '0x7434672e89b055fd02deebef203738cf0802c01b' },
    { address: '0xb33c95bc7fa309e0f3bd7e4705c5b7843900e369' },
    { address: '0x8b48cb98f3adf1504da30be6b02757ae69aec863s' },
    { address: '0x8c2b8cb9d10fcc2fee2fde9927556904ecc926c1' },
    { address: '0xa64fc17b157aaa50ac9a8341bab72d4647d0f1a7' },
    { address: '0x18a42091f186e97e6179566e3d5615426560ba93' },
    { address: '0xebf64bd0514a625c0935996b4fe1e873cd4d2c3e' },
    { address: '0x40042d27df0745e5e0cb619c0cfd7d51d59535dc' },
    { address: '0x105f00ad5f0e6931128f31f33cbd9c350dee14ce' },
];

export const useGames = (
    limit = 1000,
    status: string
): { fetching: boolean; error: Error | null; games: Array<Game> | null } => {
    // TODO: Take out hardcoding
    // const chainId = 4;
    const [error, setError] = useState<Error | null>(null);
    const [fetching, setFecthing] = useState(false);
    const [games, setGames] = useState<Array<Game> | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setFecthing(true);
            // const res = await getGames(chainId, limit, status);
            const addresses = DUMMY_GAMES.map(game => game.address);
            const ensDomains = (await getENSDomains(limit, addresses))?.accounts.map((account: any) => ({
                [account.domains[0].owner.id]: account.domains[0].name
            })) ?? [];
            const ensObj = Object.assign({}, ...ensDomains)
            const gameArr = DUMMY_GAMES.map(game => ({ address: game.address, ens: ensObj[game.address] }));
            setGames(gameArr);
        } catch (err) {
            setGames(null);
            setError(error as Error);
        }
    }, [error, limit])

    useEffect(() => {
        fetchData();
    }, [fetchData])
    return { error, fetching, games };
}