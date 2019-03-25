import request from '@/plugins/request'

export function getList() {
  return request({
    url: '/archive/list',
    method: 'get'
  })
}
