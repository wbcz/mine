
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production'
const express = require('express')
const app = express()

const webPackClientConfig = merge(base, {
    entry: {
        client: './entry-client.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
            filename: 'index.html'
        })
    ]
})

// const compiler = webpack(webPackClientConfig)
// const devMiddleware = require('webpack-dev-middleware')(compiler, {
//     publicPath: '/',
//     quiet: true
// })

// app.use(devMiddleware)

// app.listen(8080)

module.exports = webPackClientConfig