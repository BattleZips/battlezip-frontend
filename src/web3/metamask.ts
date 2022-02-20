import { utils } from 'ethers';

import {
  NETWORK_CURRENCIES,
  EXPLORER_URLS,
  NETWORK_NAMES,
  RPC_URLS,
  TESTNET_CHAIN_IDS
} from './constants';
import { isSupportedChain } from './helpers';

export const switchChainOnMetaMask = async (
  chainId: number
): Promise<boolean> => {
  if (!isSupportedChain(chainId)) return false;

  const { name, symbol } = NETWORK_CURRENCIES[chainId] || {};
  const networkName = NETWORK_NAMES[chainId];
  const rpcUrl = RPC_URLS[chainId];
  const explorerUrl = EXPLORER_URLS[chainId];
  if (
    !(name && symbol && networkName && rpcUrl && explorerUrl && window.ethereum)
  )
    return false;
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: utils.hexValue(chainId)
        }
      ]
    });
    return true;
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    // @ts-ignore
    if (switchError.code === 4902) {
      try {
        const isTestNet = TESTNET_CHAIN_IDS.includes(chainId);
        if (isTestNet) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: utils.hexValue(chainId),
                chainName: networkName,
                nativeCurrency: {
                  name,
                  symbol,
                  decimals: 18
                },
                rpcUrls: [rpcUrl],
                blockExplorerUrls: [explorerUrl]
              }
            ]
          });
        } else {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
              {
                chainId: utils.hexValue(chainId),
                chainName: networkName,
                nativeCurrency: {
                  name,
                  symbol,
                  decimals: 18
                },
                rpcUrls: [rpcUrl],
                blockExplorerUrls: [explorerUrl]
              }
            ]
          });
        }
        return true;
      } catch (addError) {
        // eslint-disable-next-line no-console
        console.error('Unable to add chain to metamask', addError);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('Unable to switch to chain on metamask', switchError);
    }
  }
  return false;
};
