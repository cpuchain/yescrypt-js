import { MainModule } from './yescrypt_wasm.js';
export * from './utils';
type yescrypt_wasm = (passwd: number, passwdLen: number, salt: number, saltLen: number, N: bigint, r: number) => number;
export declare class Yescrypt {
    nByte: number;
    Module: MainModule;
    scrypt_wasm: yescrypt_wasm;
    yescrypt_wasm: yescrypt_wasm;
    constructor(Module: MainModule);
    static init(): Promise<Yescrypt>;
    arrayToPtr(array: Uint8Array): number;
    ptrToArray(ptr: number, length: number): Uint8Array;
    freePtr(ptr: number): void;
    Hash(passwd: Uint8Array, salt: Uint8Array, N?: number, r?: number, scrypt?: boolean): Uint8Array;
}
