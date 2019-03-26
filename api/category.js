import request from '@/plugins/request'

export function getList() {
  return request({
    url: '/category/list',
    method: 'get'
  })
}
