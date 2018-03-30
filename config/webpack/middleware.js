const webpack = require('webpack')
const LRU = require('lru-cache')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const MFS = require('memory-fs')
const { PassThrough } = require('stream')
const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const clientConfig = require('./client')
const serverConfig = require('./server')
const { SOURCE_PATH, clientManifestFileName, serverBundleFileName } = require('./setting')

const indexTemplatePath = path.join(SOURCE_PATH, './server/', 'index.html');
const template = fs.readFileSync(indexTemplatePath, 'utf8');
const clientManifestFilePath = path.join(clientConfig.output.path, clientManifestFileName);
const serverBundleFilePath = path.join(serverConfig.output.path, serverBundleFileName);

let expressDevMiddleware, renderer;
const mfs = new MFS();

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

const devMiddleware = koaWebpackDevMiddleware(clientCompiler, {
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

const hotMiddleware = koaWebpackHotMiddleware(clientCompiler, {});

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
    await new Promise((resolve, reject) => {
        renderer.renderToString(
            context,
            (error, res) => {
                if (error) {
                    if (error.code === '404') {
                        ctx.status = 404;
                    } else {
                        reject(error);
                    }
                } else {
                    ctx.type = 'text/html';
                    ctx.body = res;
                }
                resolve();
            });
    });
};

module.exports =  { renderServer, devMiddleware, hotMiddleware }
