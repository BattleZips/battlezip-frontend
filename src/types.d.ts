declare module 'fake-tag' {
  function gql(
    literals: TemplateStringsArray,
    ...placeholders: string[]
  ): string;
  export = gql;
}

declare module 'ffjavascript';
declare module 'circomlibjs';
declare module 'snarkjs';
declare module 'boardWasm';
declare module 'shotWasm';
declare module '@iden3/binfileutils';
