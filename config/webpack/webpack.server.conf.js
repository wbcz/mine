
const merge = require('webpack-merge')
const base = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const resolve = dir => {
    return path.join(__dirname, '../..', dir)
}

module.exports = merge(base, {
    target: 'node',
    entry: {
        server: resolve('/src/entry-server.js')
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('/src/server/index.html'),
            filename: 'index.ssr.html',
            files: {
                js: "client.js"
            },
            excludeChunks: ['server']
        })
    ]
})