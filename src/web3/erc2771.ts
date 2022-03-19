import { Contract, providers, BytesLike } from 'ethers';
import { BATTLESHIP_GAME_CONTRACT, ABI } from 'web3/constants';
import { TransactionReceipt } from '@ethersproject/abstract-provider'

/**
 * Send a transaction as a metatransaction
 * 
 * @param biconomy - 
 * @param name - the name of the function to call
 * @param args - the parameters being used in the function call
 * @returns
 *  - error: an error if one occurred during execution
 *  - data: populated unsigned transaction data
 */
export const metatransaction = async (biconomy: any, name: string, args: any[]):
    Promise<any> => {
    const provider = biconomy.getEthersProvider();
    const sender = provider.getSigner();
    const contractAddress = BATTLESHIP_GAME_CONTRACT[parseInt(provider.provider.chainId, 16)];
    const instance = new Contract(contractAddress, ABI, sender);
    const { data } = await instance.populateTransaction[name](...args);
    const gasLimit = await provider.estimateGas({
        to: contractAddress,
        from: await sender.getAddress(),
        data: data as BytesLike
    })
    const params = {
        to: contractAddress,
        from: await sender.getAddress(),
        data: data as BytesLike,
        gasLimit,
        signatureType: "EIP712_SIGN"
    }
    
    let tx = await provider.send("eth_sendTransaction", [params])
    provider.once(tx, (transaction: any) => {
        console.log('xxx', tx)
        console.log('xxxy', transaction)
        return tx;
    })
}