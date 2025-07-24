import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const addon = require('./build/Release/yescrypt.node');

export const scrypt_kdf = addon.scrypt_kdf;
export const yescrypt_kdf = addon.yescrypt_kdf;
export const scrypt_hash = addon.scrypt_hash;
export const yescrypt_hash = addon.yescrypt_hash;