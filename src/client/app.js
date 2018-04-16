import Vue from 'vue'
import App from './App.vue'
import createStore from './store.js'
// import './common/service/ServiceWorker';
import router from './router'

export default function () {
    const store = createStore()
    const app = new Vue({
        store,
        router,
        render: h => h(App)
    })
    return { app, store, router }
}
