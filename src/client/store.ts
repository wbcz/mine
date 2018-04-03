import Vuex from 'vuex'
import Vue from 'vue'
import config from './api/index'
import $http from './api/http'

Vue.use(Vuex)

function fetchTopics(page: Object) {
    return new Promise( (resolve, reject) => {
        $http.get(config.Api.getArticleList, page as string).then((topics: any) => {
            resolve(topics.data.data)
        })
    })
}

export default function createStore() {
    return new Vuex.Store({
        state: {
            topics: '',
        },
        actions: {
            fetchTopics({ commit }) {
                return fetchTopics({page: 1}).then((topics: any) => {
                    commit('setTopics', { topics })
                })
            }
        },
        mutations: {
            setTopics(state, { topics }) {
                Vue.set(state, 'topics', topics)
            }
        }
    })
}