const store = require('store')

const userKey = 'userInfo'

export function setUserInfo(userInfo) {
  return store.set(userKey, userInfo)
}

export function getUserInfo() {
  return store.get(userKey)
}

export function removeToken() {
  return store.remove(userKey)
}
