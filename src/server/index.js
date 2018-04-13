
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import route from 'koa-route'
import serve from 'koa-static'
import mount from 'koa-mount'
import publish from './publish'
import mongo from './db/mongo'
import routes from './routes'
import Router from 'koa-router';
import { renderServer, devMiddleware, hotMiddleware }  from '../../config/webpack/middleware'
const app = new Koa()
const router = new Router()
const PUBLIC_PATH = path.resolve(__dirname, '../client')

app.use(async (ctx, next)=> {
    app.$route = router
    console.log(app, 'app')
    router.use('/', app.$route.routes(), app.$route.allowedMethods())
    await next()
})

// const mongodb = new mongo()
routes(app)

app.use(serve(PUBLIC_PATH))
// app.use(mount('/publish', publish))
app.use(devMiddleware)
app.use(hotMiddleware)
app.use(renderServer)

app.listen(3001, () => {
    console.log('server is running on port 3001')
})