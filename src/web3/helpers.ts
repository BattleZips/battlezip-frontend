import { SUPPORTED_NETWORKS } from './constants';

export const isSupportedChain = (chainId: number): boolean =>
  SUPPORTED_NETWORKS.includes(chainId);
