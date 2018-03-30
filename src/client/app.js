import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import createStore from './store.js'
// import './common/service/ServiceWorker';
import Foo from './pages/foo.vue'
import Bar from './pages/bar.vue'
import Topics from './components/topics.vue'

Vue.use(vueRouter)

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/', component: Topics },
]
 
const router = new vueRouter({
    routes
})
console.log(7777)
export default function () {
    const store = createStore()
    const app = new Vue({
        store,
        router,
        render: h => h(App)
    })
    return { app, store }
}
