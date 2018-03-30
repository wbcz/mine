
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const isProd = process.env.NODE_ENV === 'production'
const express = require('express')
const app = express()
const path = require('path')

const resolve = dir => {
    return path.join(__dirname, '../..', dir)
}

const webPackClientConfig = merge(base, {
    entry: {
        client: [resolve('/src/entry-client.js')]
    },
    plugins: [
        new VueSSRClientPlugin()
    ]
})

webPackClientConfig.entry.client.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000');
webPackClientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = webPackClientConfig