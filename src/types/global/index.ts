export { };

declare global {
    interface Window {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        circomlibjs: any;
        snarkjs: any;
        Torus: any;
    }
}