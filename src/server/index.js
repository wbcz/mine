
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import route from 'koa-route'
import serve from 'koa-static'
import mount from 'koa-mount'
import publish from './publish'
import mongo from './db/mongo'
import Router from 'koa-router';
import { renderServer, devMiddleware, hotMiddleware }  from '../../config/webpack/middleware'
const app = new Koa()
const router = new Router()
const PUBLIC_PATH = path.resolve(__dirname, '../client')

// const mongodb = new mongo()

app.use(serve(PUBLIC_PATH))
// app.use(mount('/publish', publish))
app.use(devMiddleware)
app.use(hotMiddleware)
app.use(renderServer)

app.listen(3008, () => {
    console.log('server is running on port 3001')
})