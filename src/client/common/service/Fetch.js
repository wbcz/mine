import { HOST }  from '../constant';

export const status = response => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};

export const json = response => response.json();

export const error = (err, url, options) => {
    console.log('Fetch Error:');
    console.log('Message: ', err);
    console.log('Url: ', url);
    console.log('Options: ', options);
};

const $http = (url, options) => fetch(url, options)
    .then(status)
    .then(json)
    .catch(err => error(err, url, options));


export const generatorUrl = (url = '', params = '') =>
    params ? url + '?' + generatorQueryString(params) : url;

export const generatorQueryString = params =>
    typeof params === 'object'
        ? Object.keys(params).map(key => key + '=' + JSON.stringify(params[key])).join('&')
        : params;

// TODO
const httpFetch = (url, options) => {
    console.log(HOST, 'HOST')
    url = HOST + url;
    return $http(url, options);
};

export default httpFetch;
