# Yescrypt WebAssembly Module

[![NPM Version](https://img.shields.io/npm/v/yescrypt-wasm)](https://www.npmjs.com/package/yescrypt-wasm)

Yescrypt / Scrypt WebAssembly Module for Browsers / Node.js

## Prerequisites

* Node.js LTS or Browser where WebAssembly is enabled

## Install

```bash
$ yarn add yescrypt-wasm
```

or on html header / body

```html
<script src="https://cdn.jsdelivr.net/npm/yescrypt-wasm/lib/yescrypt.umd.min.js"></script>
```

WASM file is fully embedded on script so that you need to load nothing (and should work with any bundlers without hassle)

## Build WASM (optional)

Requires latest [Emscripten](https://emscripten.org/docs/getting_started/downloads.html) WASM compiler

```bash
$ yarn && yarn build:wasm
```

Will update .wasm and bundled files

## Build library (optional)

Rebuild node.js and web umd bundle files

```bash
$ yarn && yarn build

```

## Example Code

```js
import { Yescrypt, bytesToHex } from './lib/index.js';

const getRandomHex = () => Buffer.from(crypto.getRandomValues(new Uint8Array(32)));

async function test() {
    const yescrypt = await Yescrypt.init();

    const passwd = Buffer.from("7000000001e980924e4e1109230383e66d62945ff8e749903bea4336755c00000000000051928aff1b4d72416173a8c3948159a09a73ac3bb556aa6bfbcad1a85da7f4c1d13350531e24031b939b9e2b", "hex");

    console.log(bytesToHex(yescrypt.yescrypt_kdf(passwd, getRandomHex())))
}

test();
```

Also refer `example.html` for example of using it on browser.

## References

[Yescrypt](https://github.com/openwall/yescrypt)

[scrypt-js](https://github.com/ricmoo/scrypt-js)

[scrypt-wasm](https://github.com/MyEtherWallet/scrypt-wasm)