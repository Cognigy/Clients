const config = require('./webpack.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

config.plugins = [new BundleAnalyzerPlugin()];

module.exports = config;