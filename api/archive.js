import request from '@/plugins/request'

export function getList() {
  return request({
    url: '/archive/list',
    method: 'get'
  })
}
export function getOneById(id) {
  return request({
    url: '/archive/getOne',
    method: 'get',
    params: { id }
  })
}
