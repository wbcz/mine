
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const route = require('koa-route')
const serve = require('koa-static')
const PUBLIC_PATH = path.resolve(__dirname, '../../dist')
app.use(serve(PUBLIC_PATH))

const bundle = fs.readFileSync(path.resolve(__dirname, './../../dist/server.js'), 'utf-8')
const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
    template: fs.readFileSync(path.resolve(__dirname, './../../dist/index.ssr.html'), 'utf-8')
})

app.use(route.get('/client', async (ctx, next) => {
    await new Promise((resolve, reject) => {
        html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf-8');
        ctx.body = html;
        resolve()
    })
}))

app.use(route.get('/server', async (ctx, next) => {
    await new Promise((resolve, reject) => {
        renderer.renderToString((err, html) => {
            if (err) {
                console.error(err)
                ctx.status(500).end('server is error')
                return
            }
            ctx.body = html;
            console.log(ctx)
            resolve()
        })
	})
}))

app.listen(3000, () => {
    console.log('server is running on port 3000')
});
