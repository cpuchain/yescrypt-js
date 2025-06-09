import { MainModule } from './yescrypt_wasm.js';
export * from './utils';
type yescrypt_kdf_wasm = (passwd: number, passwdLen: number, salt: number, saltLen: number, N: bigint, r: number) => number;
type yescrypt_hash = (passwd: number, passwdLen: number, salt: number, saltLen: number, N: bigint, r: number) => string;
export declare class Yescrypt {
    nByte: number;
    Module: MainModule;
    scrypt_kdf_wasm: yescrypt_kdf_wasm;
    yescrypt_kdf_wasm: yescrypt_kdf_wasm;
    scrypt_hash_: yescrypt_hash;
    yescrypt_hash_: yescrypt_hash;
    constructor(Module: MainModule);
    static init(): Promise<Yescrypt>;
    arrayToPtr(array: Uint8Array): number;
    ptrToArray(ptr: number, length: number): Uint8Array;
    freePtr(ptr: number): void;
    scrypt_kdf(passwd: Uint8Array, salt: Uint8Array, N?: number, r?: number): Uint8Array;
    yescrypt_kdf(passwd: Uint8Array, salt: Uint8Array, N?: number, r?: number): Uint8Array;
    scrypt_hash(passwd: Uint8Array, salt: Uint8Array, N?: number, r?: number): string;
    yescrypt_hash(passwd: Uint8Array, salt: Uint8Array, N?: number, r?: number): string;
}
