const { BannerPlugin } = require('webpack');
const path = require('path');

const rules = [
    {
        test: /\.ts?$/,
        loader: 'esbuild-loader',
        options: {
            loader: 'ts',
            target: 'ES2022',
        }
    }
]

const umdConfig = {
    mode: 'production',
    module: { rules },
    entry: './src/index.ts',
    output: {
        filename: 'yescrypt.umd.js',
        path: path.resolve(__dirname, './lib'),
        library: 'YescryptUmd',
        libraryTarget: 'umd'
    },
    plugins: [
        new BannerPlugin({
            banner: 'globalThis.process = { browser: true, env: {}, };',
            raw: true,
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            fs: false,
            path: false,
        },
    },
    optimization: {
        minimize: false,
    },
};

module.exports = [
    umdConfig,
    {
        ...umdConfig,
        output: {
            filename: 'yescrypt.umd.min.js',
            path: path.resolve(__dirname, './lib'),
            library: 'YescryptUmd',
            libraryTarget: 'umd'
        },
        optimization: {},
    },
    {
        mode: 'production',
        module: { rules },
        entry: './src/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, './lib'),
            libraryTarget: 'commonjs'
        },
        target: 'node',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        optimization: {
            minimize: false,
        },
    },
]