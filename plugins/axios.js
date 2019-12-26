import qs from 'qs'
import serveConfig from '../config/server-config'
import serveConfigProd from '../config/server-config-prod'
import { getToken } from '@/utils/store'
const isProd = process.env.NODE_ENV === 'production'

export default function({ $axios, redirect }) {
  $axios.defaults.baseURL = isProd ? serveConfigProd.prodBaseURL : serveConfig.devBaseURL + serveConfig.baseApi
  if (isProd) {
    $axios.defaults.proxy = serveConfigProd.proxy
  }
  $axios.setHeader('Content-Type', 'application/json, charset=UTF-8')

  $axios.onRequest(config => {
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      // 序列化
      config.data = qs.stringify(config.data)
    }
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  }, error => {
    return Promise.reject(error.message)
  })

  $axios.onResponse(response => {
    const res = response.data
    if (!res.success) {
      return response
    } else {
      return response.data
    }
  }, error => {
    return Promise.reject(error.message)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/400')
    }
  })
}
