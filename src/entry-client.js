
import createApp from './client/app.js'

const { app, store } = createApp()

if (window.__INITIAL_STATE__) {
    console.log(window.__INITIAL_STATE__, 'window.__INITIAL_STATE__')
    store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app')