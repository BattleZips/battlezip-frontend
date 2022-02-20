import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'contexts/WalletContext';
import { buildMimcSponge } from 'circomlibjs';

export const useMiMCSponge = (): { error: Error | null; mimcSponge: any | null } => {
    const { chainId } = useWallet();
    const [error, setError] = useState<Error | null>(null);
    const [mimcSponge, setMimcSponge] = useState<any | null>(null);

    const makeMimcSponge = useCallback(async () => {
        if (!chainId) return;
        try {
            debugger
            const _mimcSponge = await buildMimcSponge()
            setMimcSponge(_mimcSponge);
        } catch (err) {
            setMimcSponge(null);
            setError(error as Error);
        }
    }, [error]);

    useEffect(() => {
        makeMimcSponge();
    }, [makeMimcSponge]);
    return { error, mimcSponge };
};
