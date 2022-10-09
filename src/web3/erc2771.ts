import { Contract, providers } from 'ethers';
import { BATTLESHIP_GAME_CONTRACT, ABI } from 'web3/constants';
import { poll } from 'ethers/lib/utils';

// defines required objects to send a meta transaction to BattleshipGame.sol
// @notice YMMV if using multiple contracts
export interface IMetaTx {
    provider: providers.Web3Provider, // eip 1193 provider from web3modal
    biconomy: typeof window.Biconomy, // instantiated biconomy provider
    functionName: string, // name of function in BattleshipGame.sol to call
    args: any[] // parameters of function called
}

/**
 * Send a transaction as a metatransaction
 * 
 * @param {IMetaTx} - the metatransaction parameters as defined in interface
 * @returns {providers.TransactionResponse} - the result of the metatransaction
 */
export const metatransaction = async ({ provider, biconomy, functionName, args }: IMetaTx):
    Promise<providers.TransactionResponse> => {

    // get biconomy compatible sender/ signer
    const from = await provider.getSigner().getAddress(); // signer in eip1193 provider
    const sender = biconomy.getSignerByAddress(from);

    // create instance of contract to use
    const chainId = (await provider.getNetwork()).chainId;
    const to = BATTLESHIP_GAME_CONTRACT[chainId]; // BattleshipGame.sol address
    const instance = new Contract(to, ABI, sender);

    // define transaction parameters
    const { data } = await instance.populateTransaction[functionName](...args);
    const params = { to, from, data, signatureType: "EIP712_SIGN" };

    // send transaction
    const _provider = new providers.Web3Provider(biconomy);
    const hash = await _provider.send('eth_sendTransaction', [params]);
    const blockNum = await provider._getInternalBlockNumber(100 + 2 * provider.pollingInterval);

    // wait for transaction result
    if (typeof hash === 'string') {
        const res = await poll(async () => {
            const tx = await provider.getTransaction(hash);
            if (tx === null) return undefined;
            else return provider._wrapTransaction(tx, hash, blockNum);
        }, { oncePoll: provider });
        if (!res) throw new Error('Unable to locate tx response from metatransaction relay')
        return res;
    } else return hash;
}