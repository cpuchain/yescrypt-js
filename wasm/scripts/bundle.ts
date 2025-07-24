import { readFile, writeFile } from 'fs/promises';
import { bytesToBase64 } from '../src/utils.js';

async function bundle() {
    const wasm = new Uint8Array((await readFile('./src/yescrypt_wasm.wasm')).buffer);

    await writeFile(
        './src/bundled.ts',
        `/* eslint-disable */\nexport const bundled: string = "${bytesToBase64(wasm)}"`,
    );

    console.log('Wrote ./src/bundled.ts with bundled wasm file');
}
bundle();
