// const path = require('path');
// module.exports = {
//     mode: 'production',

//     entry: './src/webchat.tsx',
//     output: {
//         path: path.resolve(__dirname, 'lib'),
//         filename: 'webchat.js'
//     },

//     resolve: {
//         // Add `.ts` and `.tsx` as a resolvable extension.
//         extensions: [".ts", ".tsx", ".js"]
//     },

//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: [
//                     {
//                         loader: 'babel-loader',
//                     }
//                     {
//                         loader: 'ts-loader',
//                         options: {
//                             transpileOnly: true
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
// }

var path = require('path');

module.exports = {
    // Change to your "entry-point".
    mode: 'production',
    entry: ['babel-polyfill', './src/webchat.tsx'],
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'webchat.js'
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
                "presets": [
                    [
                        "@babel/env",
                        {
                            "targets": {
                                "ie": 11
                            }
                        }
                    ],
                    "@babel/typescript",
                    "@babel/preset-react"
                ],
                "plugins": [
                    "@babel/proposal-class-properties",
                    "@babel/proposal-object-rest-spread"
                ]
            }
        }],
    }
};