import request from '@/utils/request'

export function CountryGet(param) {
  return request({
    url: '/api/v1/crm/country/get',
    method: 'get',
    params: param
  })
}

export function ForeignLeadsCreate(data) {
  return request({
    url: '/api/v1/crm/foreignLeads/create',
    method: 'post',
    data
  })
}

export function ForeignLeadsGet(param) {
  return request({
    url: '/api/v1/crm/foreignLeads/get',
    method: 'get',
    params: param
  })
}

export function ForeignLeadsEdit(data) {
  return request({
    url: '/api/v1/crm/foreignLeads/edit',
    method: 'put',
    data
  })
}

export function ForeignLeadsDelete(data) {
  return request({
    url: '/api/v1/crm/foreignLeads/delete',
    method: 'delete',
    data
  })
}