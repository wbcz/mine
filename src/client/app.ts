import Vue from 'vue'
import vueRouter from 'vue-router'
import createStore from './store.js'
// import './common/service/ServiceWorker';
// import Foo from './pages/foo.vue'
// import Bar from './pages/bar.vue'

import 'pages/blog';

// Vue.use(vueRouter)
export default function () {
    const store = createStore()
    const app = new Vue({
        store,
        render: (h) =>
            h(
                'div',
                {
                    attrs: {
                        id: 'app',
                    },
                },
                [h('blog')],
            )
        // render: h => h(App)
    })
    return { app, store }
}