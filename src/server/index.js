
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import route from 'koa-route'
import serve from 'koa-static'
import mount from 'koa-mount'
import publish from './publish'
import { renderServer, wdm, whm }  from './middleware/webpack-middleware'
const app = new Koa()
const PUBLIC_PATH = path.resolve(__dirname, '../client')
app.use(serve(PUBLIC_PATH))
app.use(mount('/publish', publish))
app.use(wdm)
app.use(whm)

app.use(renderServer)

app.listen(3001, () => {
    console.log('server is running on port 3001')
});
console.log(333)