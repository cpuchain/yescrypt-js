Yescrypt for Node.js
============================

[![NPM Version](https://img.shields.io/npm/v/yescrypt)](https://www.npmjs.com/package/yescrypt)

## Prerequisites

* Node.js LTS

## Install

```bash
$ yarn add yescrypt
```

## Build

```bash
$ yarn
```

## Example Code

```js
import { yescrypt_kdf } from './index.js';

const getRandomHex = () => Buffer.from(crypto.getRandomValues(new Uint8Array(32)));

const passwd = Buffer.from("7000000001e980924e4e1109230383e66d62945ff8e749903bea4336755c00000000000051928aff1b4d72416173a8c3948159a09a73ac3bb556aa6bfbcad1a85da7f4c1d13350531e24031b939b9e2b", "hex");

// Use random value for secure KDF
const salt = getRandomHex();

console.log(yescrypt_kdf(passwd, salt).toString('hex'));
```

## References

[Yescrypt](https://github.com/openwall/yescrypt)

[Yescrypt-NAPI](http://github.com/thynson/yescrypt-napi)