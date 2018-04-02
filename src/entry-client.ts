
import createApp from './client/app.js'

const { app, store } = createApp()

// const jsdom = require('jsdom').jsdom;
// global.document = jsdom('<!doctype html><html><body></body></html>');
// global.window = document.defaultView;
// global.navigator = window.navigator;

// if (window.__INITIAL_STATE__) {
//     // console.log(window.__INITIAL_STATE__, 'window.__INITIAL_STATE__')
//     store.replaceState(window.__INITIAL_STATE__)
// }

app.$mount('#app')