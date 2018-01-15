
import Vue from 'vue';
import App from './src/client/App.vue';
import createStore from './src/client/store';

export default function (context) {
    const store = createStore();
    let app = new Vue({
        store,
        render: h => h(App)
    });
    console.log(111)
    // 找到所有 prefetchData 方法
    let components = App.components;
    console.log(components, 'components')
    let prefetchFns = [];
    for (let key in components) {
        if (!components.hasOwnProperty(key)) continue;
        let component = components[key];
        if (component.asyncData) {
            console.log(store, 'sotre')
            prefetchFns.push(component.asyncData({
                store
            }))
            console.log(prefetchFns, 'prefetchFns')
        }
    }

    return Promise.all(prefetchFns).then((res) => {
        context.state = store.state;
        console.log(context.state)
        return app;
    })
}