var path = require('path');

module.exports = {
    // Change to your "entry-point".
    mode: 'production',
    entry: ['@babel/polyfill', './src/webchat.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webchat.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
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
        }],
    }
};