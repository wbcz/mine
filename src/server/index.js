
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import publish from './publish'
import mongo from './db/mongo'
import router from './router'
import { renderServer, devMiddleware, hotMiddleware }  from '../../config/webpack/middleware'
const app = new Koa()
const PUBLIC_PATH = path.resolve(__dirname, '../client')

app.use(mount('/publish', publish))
app.use(router.routes())
    .use(router.allowedMethods())
app.use(serve(PUBLIC_PATH))
app.use(devMiddleware)
app.use(hotMiddleware)
app.use(renderServer)

app.listen(3000, () => {
    console.log('server is running on port 3000')
})