import vueRouter from 'vue-router'
import Vue from 'vue'
import Foo from './pages/foo.vue'
import Bar from './pages/bar.vue'
import Topics from './components/topics.vue'

Vue.use(vueRouter)

const ROUTERCONFIG = {
    mode: 'history', // default value 'hash'
    routes: [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar },
        { path: '/', component: Topics }
    ]
}

const router = new vueRouter(ROUTERCONFIG)

router.beforeEach((route, redirect, next) => {
    window.scrollTo(0, 0)
    next()
})

router.afterEach(route => {
})

export default router