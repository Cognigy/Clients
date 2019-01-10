const path = require('path');
module.exports = {
    mode: 'production',

    entry: './src/webchat.tsx',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'webchat.js'
    },

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    }
}