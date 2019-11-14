const store = require('store')

const userKey = 'userInfo'
const tokenKey = 'tokenKey'

export function setUserInfo(userInfo) {
  return store.set(userKey, userInfo)
}

export function getUserInfo() {
  return store.get(userKey)
}

export function setToken(token) {
  return store.set(tokenKey, token)
}

export function getToken() {
  return store.get(tokenKey)
}

export function removeToken() {
  return store.clearAll()
}
