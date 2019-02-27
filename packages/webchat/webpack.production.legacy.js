const config = require('./webpack.production');

config.entry.unshift('@babel/polyfill');
config.output.filename = 'webchat-legacy.bundle.js';
config.module.rules[0].options.presets.unshift('@babel/preset-env');

module.exports = config;