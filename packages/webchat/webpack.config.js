var webpack = require('webpack');
var path = require('path');

module.exports = {
    // Change to your "entry-point".
    entry: ['@babel/polyfill', './src/webchat-embed/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webchat.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ],
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    rootMode: 'upward',
                    presets: [
                        "@babel/preset-env",
                        "@babel/typescript",
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "@babel/proposal-class-properties",
                        "@babel/plugin-syntax-dynamic-import"
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    }
};