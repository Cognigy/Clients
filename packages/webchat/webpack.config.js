var path = require('path');

module.exports = {
    entry: ['./src/webchat-embed/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webchat.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
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
                        "@babel/typescript",
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "@babel/proposal-class-properties"
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, 
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svg-react-loader'
                },
            }
        ],
    }
};