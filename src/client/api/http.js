import axios from 'axios'
import qs from 'qs'
import config from './index'

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url: url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    },
    get(url, params) {
        return axios({
            method: 'get',
            url: url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    }
}
