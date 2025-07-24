import { getRollupConfig } from '@cpuchain/rollup';

const config = [
    getRollupConfig({ input: './src/index.ts' }),
    getRollupConfig({
        input: './src/index.ts',
        browserName: 'YescryptWASM',
        polyfillBrowser: false,
    }),
    getRollupConfig({
        input: './src/index.ts',
        browserName: 'YescryptWASM',
        polyfillBrowser: false,
        minify: true,
    }),
]

config[1].output[0].file = 'lib/yescrypt.umd.js';
config[2].output[0].file = 'lib/yescrypt.umd.min.js';

export default config;