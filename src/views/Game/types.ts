export type Ship = {
    color: string;
    length: number;
    name: string;
    orientation?: 'x' | 'y';
    sections: number[];
}

export const EMPTY_SHIP: Ship = {
    color: '',
    length: 0,
    name: '',
    sections: []
}