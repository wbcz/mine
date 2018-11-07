import user from '../controllers/user'
import Router from 'koa-router'
const router = new Router()

const routerMap = [
    ['get', '/api/getUserInfo', user, 'getUserInfo'],
    ['get', '/api/addUser', user, 'addUser']
]

routerMap.forEach(route => {
    const [method, path, controller, action] = route
    router[method](path, async (ctx, next) => {
        await controller[action].bind(Object.assign(controller, { ctx }))(ctx, next)
    })
})

export default router