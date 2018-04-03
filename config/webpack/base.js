const path = require('path')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolve = dir => {
    return path.join(__dirname, '../..', dir)
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': resolve('src'),
            'assets': resolve('src') + '/client/assets',
            'common': resolve('src') + '/client/common',
            'components': resolve('src/client/components'),
            'pages': resolve('src') + '/client/pages',
            'vuexModule': resolve('src') + '/client/vuex/module'
        }
    },
    output: {
        path: resolve('/build/client/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader?interpolate',
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=[path][name]-[hash:8].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
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