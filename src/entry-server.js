
import Vue from 'vue'
import App from './client/App.vue'
import createApp from './client/app'
import createStore from './client/store'

const jsdom = require('jsdom').jsdom;
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

export default function (context) {
    const { app, router, store } = createApp();
    router.push(context.url)
    console.log(context.url, 'context.url')
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
        return Promise.reject({ code: '404' });
    }
    return Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
            return component.asyncData({store});
        }
    })).then(res => {
        context.state = store.state
        return app
    })
}