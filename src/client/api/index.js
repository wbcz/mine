
const BASE = 'https://cnodejs.org/api/v1/'
const timeout = 30000

const getUrl = path => {
    return BASE + path
}

const Api = {
    getArticleList: getUrl('topics')
}

export default {
    Api,
    timeout
}
