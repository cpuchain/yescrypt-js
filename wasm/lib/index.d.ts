declare namespace RuntimeExports {
	/**
	 * @param {string|null=} returnType
	 * @param {Array=} argTypes
	 * @param {Arguments|Array=} args
	 * @param {Object=} opts
	 */
	function ccall(ident: any, returnType?: (string | null) | undefined, argTypes?: any[] | undefined, args?: (Arguments | any[]) | undefined, opts?: any | undefined): any;
	/**
	 * @param {string=} returnType
	 * @param {Array=} argTypes
	 * @param {Object=} opts
	 */
	function cwrap(ident: any, returnType?: string | undefined, argTypes?: any[] | undefined, opts?: any | undefined): any;
	let HEAPF32: any;
	let HEAPF64: any;
	let HEAP_DATA_VIEW: any;
	let HEAP8: any;
	let HEAPU8: any;
	let HEAP16: any;
	let HEAPU16: any;
	let HEAP32: any;
	let HEAPU32: any;
	let HEAP64: any;
	let HEAPU64: any;
}
export interface WasmModule {
	_scrypt_kdf_wasm(_0: number, _1: number, _2: number, _3: number, _4: BigInt, _5: number, _6: number, _7: number): number;
	_malloc(_0: number): number;
	_yescrypt_kdf_wasm(_0: number, _1: number, _2: number, _3: number, _4: BigInt, _5: number, _6: number, _7: number): number;
	_scrypt_hash(_0: number, _1: number, _2: number, _3: number, _4: BigInt, _5: number, _6: number, _7: number): number;
	_yescrypt_hash(_0: number, _1: number, _2: number, _3: number, _4: BigInt, _5: number, _6: number, _7: number): number;
	_free(_0: number): void;
}
export type MainModule = WasmModule & typeof RuntimeExports;
export declare function bytesToBase64(bytes: Uint8Array): string;
export declare function base64ToBytes(base64: string): Uint8Array<ArrayBuffer>;
export declare function bytesToHex(bytes: Uint8Array): string;
export declare function hexToBytes(hexStr: string): Uint8Array<ArrayBuffer>;
export type yescrypt_kdf_wasm = (passwd: number, passwdLen: number, salt: number, saltLen: number, N: bigint, r: number, p: number, t: number) => number;
export type yescrypt_hash = (passwd: number, passwdLen: number, salt: number, saltLen: number, N: bigint, r: number, p: number, t: number) => string;
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
	scrypt_kdf(passwd: Uint8Array, salt: Uint8Array, N?: number, r?: number, p?: number, t?: number): Uint8Array;
	yescrypt_kdf(passwd: Uint8Array, salt: Uint8Array, N?: number, r?: number, p?: number, t?: number): Uint8Array;
	scrypt_hash(passwd: Uint8Array, salt: Uint8Array, N?: number, r?: number, p?: number, t?: number): string;
	yescrypt_hash(passwd: Uint8Array, salt: Uint8Array, N?: number, r?: number, p?: number, t?: number): string;
}

export {};
