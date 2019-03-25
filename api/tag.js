import request from '@/plugins/request'

export function getList() {
  return request({
    url: '/tag/list',
    method: 'get'
  })
}
