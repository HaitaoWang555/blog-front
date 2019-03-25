import axios from 'axios'
import qs from 'qs'
// import serverConfig from '../config/server-config'

const service = axios.create({
  // baseURL: serverConfig.api + 'api/', // 本地做反向代理
  baseURL: 'https://www.easy-mock.com/mock/5c947df20ac961049563ba57/blog',
  timeout: 5000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  // proxy: serverConfig.baseProxy
})

// 请求拦截（配置发送请求的信息） 传参序列化
service.interceptors.request.use((config) => {
  if (
    config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'delete'
  ) {
    // 序列化
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截（配置请求回来的信息）
service.interceptors.response.use(function(response) {
  // 处理响应数据
  return response.data
}, function(error) {
  // 处理响应失败

  return Promise.reject(error)
})

export default service
