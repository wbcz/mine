
const merge = require('webpack-merge')
const base = require('./base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

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
    externals: Object.keys(require(resolve('/package.json')).dependencies),
    plugins: [
        new VueSSRServerPlugin()
    ]
})