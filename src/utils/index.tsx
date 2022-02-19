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
