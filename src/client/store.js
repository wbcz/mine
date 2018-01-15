import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

function fetchBar() {
    return new Promise(function (resolve, reject) {
        resolve('bar ajax 返回数据');
    });
}

export default function createStore() {
    return new Vuex.Store({
        state: {
            bar: '',
        },
        actions: {
            fetchBar({ commit }) {
                return fetchBar().then(msg => {
                    commit('setBar', { msg })
                })
            }
        },
        mutations: {
            setBar(state, { msg }) {
                Vue.set(state, 'bar', msg);
            }
        }
    })
}