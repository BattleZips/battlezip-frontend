export { };

declare global {
        interface Window {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                Biconomy: any;
                circomlibjs: any;
                snarkjs: any;
                Torus: any;
        }
}