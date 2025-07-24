import { bundled } from './bundled.js';
import { base64ToBytes } from './utils.js';
import yescryptWasm, { MainModule } from './yescrypt_wasm.js';

export * from './utils.js';

type yescrypt_kdf_wasm = (
    passwd: number,
    passwdLen: number,
    salt: number,
    saltLen: number,
    N: bigint,
    r: number,
    p: number,
    t: number,
) => number;

type yescrypt_hash = (
    passwd: number,
    passwdLen: number,
    salt: number,
    saltLen: number,
    N: bigint,
    r: number,
    p: number,
    t: number,
) => string;

export class Yescrypt {
    nByte: number;
    Module: MainModule;
    scrypt_kdf_wasm: yescrypt_kdf_wasm;
    yescrypt_kdf_wasm: yescrypt_kdf_wasm;
    scrypt_hash_: yescrypt_hash;
    yescrypt_hash_: yescrypt_hash;

    constructor(Module: MainModule) {
        this.nByte = 1;
        this.Module = Module;
        this.scrypt_kdf_wasm = this.Module.cwrap('scrypt_kdf_wasm', undefined, [
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
        ]) as yescrypt_kdf_wasm;
        this.yescrypt_kdf_wasm = this.Module.cwrap('yescrypt_kdf_wasm', undefined, [
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
        ]) as yescrypt_kdf_wasm;
        this.scrypt_hash_ = this.Module.cwrap('scrypt_hash', 'string', [
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
        ]) as yescrypt_hash;
        this.yescrypt_hash_ = this.Module.cwrap('yescrypt_hash', 'string', [
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
        ]) as yescrypt_hash;
    }

    static async init() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (globalThis as any).WebAssembly === 'undefined') {
            throw new Error('WebAssembly is not enabled with this browser');
        }

        const wasmBinary = base64ToBytes(bundled);

        const module = await yescryptWasm({
            wasmBinary,
            locateFile: (file: string) => file,
        });

        return new Yescrypt(module);
    }

    // https://stackoverflow.com/questions/41875728/pass-a-javascript-array-as-argument-to-a-webassembly-function
    // Takes an Uint8Array, copies it to the heap and returns a pointer
    arrayToPtr(array: Uint8Array): number {
        const ptr = this.Module._malloc(array.length * this.nByte);
        this.Module.HEAPU8.set(array, ptr / this.nByte);
        return ptr;
    }

    // Takes a pointer and  array length, and returns a Uint8Array from the heap
    ptrToArray(ptr: number, length: number): Uint8Array {
        const array = new Uint8Array(length);
        const pos = ptr / this.nByte;
        array.set(this.Module.HEAPU8.subarray(pos, pos + length));
        return array;
    }

    freePtr(ptr: number) {
        this.Module._free(ptr);
    }

    scrypt_kdf(passwd: Uint8Array, salt: Uint8Array, N = 4096, r = 32, p = 1, t = 0): Uint8Array {
        const passwdPtr = this.arrayToPtr(passwd);
        const saltPtr = this.arrayToPtr(salt);
        const ptr = this.scrypt_kdf_wasm(passwdPtr, passwd.length, saltPtr, salt.length, BigInt(N), r, p, t);
        const hash = this.ptrToArray(ptr, 64);
        this.freePtr(passwdPtr);
        this.freePtr(saltPtr);
        this.freePtr(ptr);
        return hash;
    }

    yescrypt_kdf(passwd: Uint8Array, salt: Uint8Array, N = 4096, r = 32, p = 1, t = 0): Uint8Array {
        const passwdPtr = this.arrayToPtr(passwd);
        const saltPtr = this.arrayToPtr(salt);
        const ptr = this.yescrypt_kdf_wasm(
            passwdPtr,
            passwd.length,
            saltPtr,
            salt.length,
            BigInt(N),
            r,
            p,
            t,
        );
        const hash = this.ptrToArray(ptr, 64);
        this.freePtr(passwdPtr);
        this.freePtr(saltPtr);
        this.freePtr(ptr);
        return hash;
    }

    scrypt_hash(passwd: Uint8Array, salt: Uint8Array, N = 4096, r = 32, p = 1, t = 0): string {
        const passwdPtr = this.arrayToPtr(passwd);
        const saltPtr = this.arrayToPtr(salt);
        const ptr = this.scrypt_hash_(passwdPtr, passwd.length, saltPtr, salt.length, BigInt(N), r, p, t);
        this.freePtr(passwdPtr);
        this.freePtr(saltPtr);
        return ptr;
    }

    yescrypt_hash(passwd: Uint8Array, salt: Uint8Array, N = 4096, r = 32, p = 1, t = 0): string {
        const passwdPtr = this.arrayToPtr(passwd);
        const saltPtr = this.arrayToPtr(salt);
        const ptr = this.yescrypt_hash_(passwdPtr, passwd.length, saltPtr, salt.length, BigInt(N), r, p, t);
        this.freePtr(passwdPtr);
        this.freePtr(saltPtr);
        return ptr;
    }
}
