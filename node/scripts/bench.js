import { yescrypt_kdf } from '../index.js';

const tests = 30;

const N = 1024;
const r = 8;

const timeStart = Date.now();

for (let i = 0; i < tests; ++i) {
    const buf = Buffer.allocUnsafe(4);
    buf.writeUint32BE(i)
    console.log(yescrypt_kdf(buf, Buffer.from('')).toString('hex'));
}

const timeTook = Date.now() - timeStart;
const hps = Math.floor(1000 * tests / timeTook);

console.log(`${tests} Tests: ${Date.now() - timeStart}ms (${hps}H/s)`);