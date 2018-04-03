
import Vue from 'vue'
import createApp from './client/app'
const { app, store} = createApp()

export default function (context) {
    // 找到所有 prefetchData 方法
    let components = app.components
    let prefetchFns = []
    for (let key in components) {
        if (!components.hasOwnProperty(key)) continue
        let component = components[key]
        if (component.asyncData) {
            prefetchFns.push(component.asyncData({
                store
            }))
        }
    }

    return Promise.all(prefetchFns).then(res => {
        context.state = store.state
        return app
    })
}