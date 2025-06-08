import { bundled } from './bundled';
import { base64ToBytes } from './utils';
import yescryptWasm, { MainModule } from './yescrypt_wasm.js';

export * from './utils';

type yescrypt_wasm = (
    passwd: number,
    passwdLen: number,
    salt: number,
    saltLen: number,
    N: bigint,
    r: number,
) => number;

export class Yescrypt {
    nByte: number;
    Module: MainModule;
    scrypt_wasm: yescrypt_wasm;
    yescrypt_wasm: yescrypt_wasm;

    constructor(Module: MainModule) {
        this.nByte = 1;
        this.Module = Module;
        this.scrypt_wasm = this.Module.cwrap('scrypt_wasm', undefined, [
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
        ]) as yescrypt_wasm;
        this.yescrypt_wasm = this.Module.cwrap('yescrypt_wasm', undefined, [
            'number',
            'number',
            'number',
            'number',
            'number',
            'number',
        ]) as yescrypt_wasm;
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

    Hash(passwd: Uint8Array, salt: Uint8Array, N = 2048, r = 32, scrypt = false): Uint8Array {
        const passwdPtr = this.arrayToPtr(passwd);
        const saltPtr = this.arrayToPtr(salt);
        const ptr = scrypt
            ? this.scrypt_wasm(passwdPtr, passwd.length, saltPtr, salt.length, BigInt(N), r)
            : this.yescrypt_wasm(passwdPtr, passwd.length, saltPtr, salt.length, BigInt(N), r);
        const hash = this.ptrToArray(ptr, 32);
        this.freePtr(passwdPtr);
        this.freePtr(saltPtr);
        this.freePtr(ptr);
        return hash;
    }
}
