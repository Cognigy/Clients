const config = require('./webpack.config')

module.exports = {
    ...config,
    externals: {
        react: 'React'
    }
}