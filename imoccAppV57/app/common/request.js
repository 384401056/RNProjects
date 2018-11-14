
import queryString from 'query-string'
import _ from 'lodash'
import { header } from './config'

export let get = (url, params) => {
    if (params) {
        url += '?' + queryString.stringify(params);
    }
    console.log("get: "+url);
    return fetch(url)
        .then((response) => response.json());
}

export let post = (url, body) => {
    let options = _.extend(header, {
        body: JSON.stringify(body)
    })

    return fetch(url, options)
        .then((response) => response.json());
}
