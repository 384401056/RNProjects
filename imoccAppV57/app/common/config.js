'use strict'

let hearder = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

let api = {
  base: 'http://rap2api.taobao.org/app/mock/117029',
  creations: '/api/creations'
}

export {hearder, api};
