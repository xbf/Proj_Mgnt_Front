// import axios from 'axios'

const token = 'accesstoken'
const refToken = 'refreshToken'

export function getToken () {
  return window.localStorage.getItem(token)
  // return Cookies.get(LoginKey)
}

export function setToken (accessToken) {
  return window.localStorage.setItem(token, accessToken)
}

export function removeToken () {
  return window.localStorage.removeItem(token)
  // return Cookies.remove(LoginKey)
}

export function getRefreshToken () {
  return window.localStorage.getItem(refreshToken)
}

export function setRefreshToken (refreshToken) {
  return window.localStorage.setItem(refToken, refreshToken)
}

export function removeRefreshToken () {
  return window.localStorage.removeItem(refToken)
}

export function getItem (key) {
  return window.localStorage.getItem(key)
}

export function setItem (key, value) {
  return window.localStorage.setItem(key, value)
}

export function removeItem (key) {
  return window.localStorage.removeItem(key)
}
