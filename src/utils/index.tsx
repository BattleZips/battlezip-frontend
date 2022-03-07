export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function formatAddress(
  address: string | null | undefined,
  ensName: string | null | undefined,
  chars = 4
): string {
  if (ensName) return ensName;
  else if (address)
    return `${address
      .substring(0, chars + 2)
      .toLowerCase()}...${address.substring(42 - chars)}`;
  else return '';
}

/**
 * Build contract call args
 * @dev 'massage' circom's proof args into format parsable by solidity
 * @notice further mutation of pi_b occurs @ in our smart contract
 *         calldata as subgraphs cannot handle nested arrays
 *
 * @param {Object} proof - the proof generated from circom circuit
 * @returns - array of uint256 representing proof parsable in solidity
 */
export function buildProofArgs(proof: any) {
  return [
    proof.pi_a.slice(0, 2), // pi_a
    // genZKSnarkProof reverses values in the inner arrays of pi_b
    proof.pi_b[0].slice(0).reverse(),
    proof.pi_b[1].slice(0).reverse(),
    proof.pi_c.slice(0, 2) // pi_c
  ];
}
