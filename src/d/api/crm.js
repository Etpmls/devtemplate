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

export function LeadsConvertToCustomer(data) {
  return request({
    url: '/api/v1/crm/foreignLeads/convertToCustomer',
    method: 'post',
    data
  })
}

export function CustomerCreate(data) {
  return request({
    url: '/api/v1/crm/customer/create',
    method: 'post',
    data
  })
}

export function CustomerGet(param) {
  return request({
    url: '/api/v1/crm/customer/get',
    method: 'get',
    params: param
  })
}

export function CustomerEdit(data) {
  return request({
    url: '/api/v1/crm/customer/edit',
    method: 'put',
    data
  })
}

export function CustomerDelete(data) {
  return request({
    url: '/api/v1/crm/customer/delete',
    method: 'delete',
    data
  })
}
