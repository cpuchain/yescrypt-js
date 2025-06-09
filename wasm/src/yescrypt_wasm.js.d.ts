// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
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
interface WasmModule {
  _scrypt_kdf_wasm(_0: number, _1: number, _2: number, _3: number, _4: BigInt, _5: number, _6: number, _7: number): number;
  _malloc(_0: number): number;
  _yescrypt_kdf_wasm(_0: number, _1: number, _2: number, _3: number, _4: BigInt, _5: number, _6: number, _7: number): number;
  _scrypt_hash(_0: number, _1: number, _2: number, _3: number, _4: BigInt, _5: number, _6: number, _7: number): number;
  _yescrypt_hash(_0: number, _1: number, _2: number, _3: number, _4: BigInt, _5: number, _6: number, _7: number): number;
  _free(_0: number): void;
}

export type MainModule = WasmModule & typeof RuntimeExports;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
