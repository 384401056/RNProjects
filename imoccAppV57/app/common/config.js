'use strict'

const hearder = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

const api = {
  base: 'http://rap2api.taobao.org/app/mock/117029',
  creations: '/api/creations',
  comments: '/api/comments',
}

export {hearder, api};
