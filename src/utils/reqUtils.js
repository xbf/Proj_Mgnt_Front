import axios from 'axios'
import {ElMessage} from 'element-plus'
import {getToken, getRefreshToken} from '../utils/catch'

axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + getToken()
  return config
}, err => {
  ElMessage.error('请求超时!')
  return Promise.resolve(err)
})

axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 'error') {
    ElMessage.error({message: data.data.msg})
    return
  }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    ElMessage.error({message: '服务器被吃了⊙﹏⊙∥'})
  } else if (err.response.status === 403) {
    ElMessage.error({message: '权限不足,请联系管理员!'})
  } else {
    ElMessage.error({message: '未知错误!'})
  }
  return Promise.resolve(err)
})

let base = ''

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Authorization': auth
    }
  })
}

export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  })
}

export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  })
}

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    transformRequest: [function (params) {
      let ret = ''
      for (let it in params) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
      }
      return ret
    }]
  })
}
