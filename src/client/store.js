import Vuex from 'vuex'
import Vue from 'vue'
import config from './api/index.js'
import $http from './api/http.js'

Vue.use(Vuex)

function fetchTopics() {
    return new Promise( (resolve, reject) => {
        $http.get(config.Api.getArticleList, {page: 1}).then(topics => {
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
                return fetchTopics().then(topics => {
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