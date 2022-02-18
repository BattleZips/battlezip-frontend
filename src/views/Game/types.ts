export type Ship = {
  color: string;
  image: string;
  length: number;
  name: string;
  orientation?: 'x' | 'y';
  sections: number[];
};

export const EMPTY_SHIP: Ship = {
  color: '',
  image: '',
  length: 0,
  name: '',
  sections: []
};
