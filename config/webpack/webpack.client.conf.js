
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.conf.js');
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
        new HtmlWebpackPlugin({
            template: resolve('/src/client/index.html'),
            filename: 'index.html'
        }),
        new VueSSRClientPlugin()
    ]
})

webPackClientConfig.entry.client.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000');
webPackClientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

// const compiler = webpack(webPackClientConfig)
// const devMiddleware = require('webpack-dev-middleware')(compiler, {
//     publicPath: '/',
//     quiet: true
// })

// app.use(devMiddleware)

// app.listen(8080)

module.exports = webPackClientConfig