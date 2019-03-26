import request from '@/plugins/request'

export function getList(limit, offect = 1) {
  return request({
    url: '/article/list',
    method: 'get',
    params: { limit, offect }
  })
}
