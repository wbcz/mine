
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import route from 'koa-route'
import serve from 'koa-static'
import mount from 'koa-mount'
import publish from './publish'

const app = new Koa()
const PUBLIC_PATH = path.resolve(__dirname, '../../dist')


app.use(serve(PUBLIC_PATH))

const bundle = fs.readFileSync(path.resolve(__dirname, './../../dist/server.js'), 'utf-8')
const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
    template: fs.readFileSync(path.resolve(__dirname, './../../dist/index.ssr.html'), 'utf-8')
})

app.use(mount('/publish', publish))


app.use(route.get('/', async (ctx, next) => {
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
console.log(333)