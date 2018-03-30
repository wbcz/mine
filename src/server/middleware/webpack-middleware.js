


import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import MFS from 'memory-fs';
import { PassThrough } from 'stream';
import path from 'path';
import fs from 'fs';
import LRU from 'lru-cache';
import { createBundleRenderer } from 'vue-server-renderer';
import clientConfig from '../../../config/webpack/webpack.client.conf'
import serverConfig from '../../../config/webpack/webpack.server.conf'
import { SOURCE_PATH, clientManifestFileName, serverBundleFileName } from '../../../config/webpack/setting'

const indexTemplatePath = path.join(SOURCE_PATH, './server/', 'index.html');
const template = fs.readFileSync(indexTemplatePath, 'utf8');

console.log(indexTemplatePath, 'indexTemplatePath')

const mfs = new MFS();
const clientManifestFilePath = path.join(clientConfig.output.path, clientManifestFileName);
const serverBundleFilePath = path.join(serverConfig.output.path, serverBundleFileName);
// const clientConfig = require('../../../config/webpack/webpack.client.conf')
// const compiler = webpack(clientConfig)



let expressDevMiddleware;
let renderer

const createRenderer = function (bundle, options = {}) {
    renderer = createBundleRenderer(bundle, Object.assign({
        template,
        cache: LRU({
            max: 1000
        }),
        runInNewContext: false
    }, options));
};
const updateRenderer = () => {
    try {
        const options = {
            clientManifest: JSON.parse(expressDevMiddleware.fileSystem.readFileSync(clientManifestFilePath, 'utf-8'))
        };
        createRenderer(JSON.parse(mfs.readFileSync(serverBundleFilePath, 'utf-8')), options);
    } catch (e) {
        createRenderer(JSON.parse(mfs.readFileSync(serverBundleFilePath, 'utf-8')));
    }
    console.log('Renderer is updated.');
};

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

const clientCompiler = webpack(clientConfig);

const wdm = koaWebpackDevMiddleware(clientCompiler, {
    // display no info to console (only warnings and errors)
    noInfo: false,
    stats: {
        colors: true,
        cached: false
    },
    // contentBase: clientConfig.output.path,
    // publicPath: clientConfig.output.publicPath
});

clientCompiler.plugin('done', updateRenderer);

const whm = koaWebpackHotMiddleware(clientCompiler, {});

// watch and update server renderer
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    updateRenderer();
});


const renderServer = async ctx => {
    const context = { url: ctx.url };
    console.log(context, 'context')
    // Have to create a promise, because koa don't wait for render callback
    await new Promise((resolve, reject) => {
        renderer.renderToString(
            context,
            (error, vueApp) => {
                if (error) {
                    if (error.code === '404') {
                        ctx.status = 404;
                    } else {
                        reject(error);
                    }
                } else {
                    ctx.type = 'text/html';
                    ctx.body = vueApp;
                }
                resolve();
            });
    });
};

export { renderServer, wdm, whm }
