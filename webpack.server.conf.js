
const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
    entry: {
        server: './entry-server.js'
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/server/index.html',
            filename: 'index.ssr.html',
            files: {
                js: "client.js"
            },
            excludeChunks: ['server']
        })
    ]
})