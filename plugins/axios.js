import qs from 'qs'

export default function({ $axios, redirect }) {
  $axios.defaults.baseURL = 'http://localhost:3000/api'
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
    return config
  }, error => {
    return Promise.reject(error.message)
  })

  $axios.onResponse(response => {
    return response.data
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