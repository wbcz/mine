


import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import MFS from 'memory-fs';
import { PassThrough } from 'stream';
import path from 'path';
import fs from 'fs';

import { createBundleRenderer } from 'vue-server-renderer';
import clientConfig from '../../../config/webpack/webpack.client.conf'
import serverConfig from '../../../config/webpack/webpack.server.conf'
import convert from 'koa-convert'
const indexTemplatePath = path.join(__dirname, '../../../dist/',  '/index.html');
const template = fs.readFileSync(indexTemplatePath, 'utf8');

const mfs = new MFS();
const clientManifestFileName = 'vue-ssr-client-manifest.json';
const serverBundleFileName = 'vue-ssr-server-bundle.json';

const clientManifestFilePath = path.join(clientConfig.output.path, clientManifestFileName);
const serverBundleFilePath = path.join(serverConfig.output.path, serverBundleFileName);

console.log(serverBundleFilePath, 'serverBundleFilePath')

const config = require('../../../config/webpack/webpack.client.conf')
const compiler = webpack(config)

let expressDevMiddleware;
const koaWebpackDevMiddleware = (compiler, opts) => {
    expressDevMiddleware = webpackDevMiddleware(compiler, opts);
    return async (ctx, next) => {
        await new Promise(resolve =>
            expressDevMiddleware(ctx.req, {
                end: (content) => {
                    ctx.body = content;
                    resolve();
                },
                setHeader: ctx.set.bind(ctx)
            }, () => resolve(next()))
        );
    };
};

const koaWebpackHotMiddleware = (compiler, opts) => {
    const expressMiddleware = webpackHotMiddleware(compiler, opts);
    return async (ctx, next) => {
        let stream = new PassThrough();
        ctx.body = stream;
        await expressMiddleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (state, headers) => {
                ctx.state = state;
                ctx.set(headers);
            }
        }, next);
    }
};

const wdm = koaWebpackDevMiddleware(compiler, {
    // display no info to console (only warnings and errors)
    noInfo: false,
    stats: {
        colors: true,
        cached: false
    },
    contentBase: clientConfig.output.path,
    publicPath: clientConfig.output.publicPath
});
const whm = koaWebpackHotMiddleware(compiler, {});

const updateRenderer = () => {
    try {
        const options = {
            clientManifest: JSON.parse(expressDevMiddleware.fileSystem.readFileSync(clientManifestFilePath, 'utf-8'))
        };
        createBundleRenderer(JSON.parse(mfs.readFileSync(serverBundleFilePath, 'utf-8')), { template }, options )

    } catch (e) {
        // createBundleRenderer(JSON.parse(mfs.readFileSync(serverBundleFilePath, 'utf-8')), { template }, options)
        // createRenderer(JSON.parse(mfs.readFileSync(serverBundleFilePath, 'utf-8')));
    }
};

compiler.plugin('done', updateRenderer);

const renderServer = async ctx => {
    await new Promise((resolve, reject) => {
        const context = {url: ctx.url}
        createBundleRenderer.renderToString(context, (err, res) => {
            if (err) {
                reject(err)
            } else {
                ctx.type = 'text/html'
                ctx.body = res
            }
            resolve()
        })
    })
}

export { renderServer, wdm, whm }
