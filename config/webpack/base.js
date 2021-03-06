const path = require('path')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolve = dir => {
    return path.join(__dirname, '../..', dir)
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue: 'vue/dist/vue.js',
            '@': resolve('src')
        }
    },
    output: {
        path: resolve('/build/client/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: resolve('src/client/assets/images/icon.png'),
                to: 'assets/images/icon.png'
            }
        ]),
        new CopyWebpackPlugin([
            { from: resolve('src/manifest.json')}
        ]),
        // new CopyWebpackPlugin([
        //     { from: resolve('src/service-worker.js')}
        // ]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}