
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import publish from './publish'
import mongo from './db/mongo'
import router from './router'
import graphQLHTTP from 'koa-graphql'
//transform koa1 version
import convert from 'koa-convert'
import schema from './graphql'
import { renderServer, devMiddleware, hotMiddleware }  from '../../config/webpack/middleware'
const app = new Koa()
const PUBLIC_PATH = path.resolve(__dirname, '../client')
//static file is mounted on path
app.use(mount('/publish', publish))
app.use(mount('/graphql', graphQLHTTP({ schema, pretty: true})))

app.use(router.routes())
    //if no allowedMethods, no response status
    .use(router.allowedMethods())
app.use(serve(PUBLIC_PATH))
app.use(devMiddleware)
app.use(hotMiddleware)
app.use(renderServer)

app.listen(3000, () => {
    console.log('server is running on port 3000')
})