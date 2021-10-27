import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}

export function UserDingtalkLogin(data) {
  return request({
    url: '/api/v1/user/dingtalkLogin',
    method: 'post',
    data
  })
}

export function UserGetCurrent(token) {
  return request({
    url: '/api/v1/user/getCurrent',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/v1/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/api/v1/user/register',
    method: 'post',
    data
  })
}

export function RoleCreate(data) {
  return request({
    url: '/api/v1/role/create',
    method: 'post',
    data
  })
}

export function RoleEdit(data) {
  return request({
    url: '/api/v1/role/edit',
    method: 'put',
    data
  })
}

export function RoleGet(param) {
  return request({
    url: '/api/v1/role/get',
    method: 'get',
    params: param
  })
}

export function RoleDelete(data) {
  return request({
    url: '/api/v1/role/delete',
    method: 'delete',
    data
  })
}

export function UserCreate(data) {
  return request({
    url: '/api/v1/user/create',
    method: 'post',
    data
  })
}

export function UserEdit(data) {
  return request({
    url: '/api/v1/user/edit',
    method: 'put',
    data
  })
}

export function UserGet(param) {
  return request({
    url: '/api/v1/user/get',
    method: 'get',
    params: param
  })
}

export function UserDelete(data) {
  return request({
    url: '/api/v1/user/delete',
    method: 'delete',
    data
  })
}

export function UserUpdateInformation(data) {
  return request({
    url: '/api/v1/user/updateInformation',
    method: 'put',
    data
  })
}

export function MenuGet() {
  return request({
    url: '/api/v1/menu/get',
    method: 'get'
  })
}

export function MenuCreate(data) {
  return request({
    url: '/api/v1/menu/create',
    method: 'post',
    data
  })
}

export function PermissionCreate(data) {
  return request({
    url: '/api/v1/permission/create',
    method: 'post',
    data
  })
}

export function PermissionEdit(data) {
  return request({
    url: '/api/v1/permission/edit',
    method: 'put',
    data
  })
}

export function PermissionGet(param) {
  return request({
    url: '/api/v1/permission/get',
    method: 'get',
    params: param
  })
}

export function PermissionDelete(data) {
  return request({
    url: '/api/v1/permission/delete',
    method: 'delete',
    data
  })
}

export function SettingClearCache() {
  return request({
    url: '/api/v1/setting/cacheClear',
    method: 'get'
  })
}

export function SettingDiskCleanup() {
  return request({
    url: '/api/v1/setting/diskCleanUp',
    method: 'get'
  })
}

export function PermissionGetAdvancedVerify() {
  return request({
    url: '/api/v1/permission/getAdvancedVerify',
    method: 'get'
  })
}

/**
 * @return {string}
 */
export function AttachmentUploadImage() {
  return process.env.VUE_APP_BASE_API + 'api/v1/attachment/uploadImage'
}

export function MarketCreate(data) {
  return request({
    url: '/api/v1/market/create',
    method: 'post',
    data
  })
}

export function MarketGetMine() {
  return request({
    url: '/api/v1/market/getMine',
    method: 'get'
  })
}

export function MarketGet() {
  return request({
    url: '/api/v1/market/get',
    method: 'get'
  })
}

export function MarketDelete(data) {
  return request({
    url: '/api/v1/market/delete',
    method: 'delete',
    data
  })
}

export function BiddingCreate(data) {
  return request({
    url: '/api/v1/bidding/create',
    method: 'post',
    data
  })
}

export function BiddingGetMine() {
  return request({
    url: '/api/v1/bidding/getMine',
    method: 'get'
  })
}

export function BiddingGet() {
  return request({
    url: '/api/v1/bidding/get',
    method: 'get'
  })
}

export function BiddingDelete(data) {
  return request({
    url: '/api/v1/bidding/delete',
    method: 'delete',
    data
  })
}

export function BiddingSupervisorUpdate(data) {
  return request({
    url: '/api/v1/bidding/supervisorUpdate',
    method: 'put',
    data
  })
}

export function ProjectUserUpdate(data) {
  return request({
    url: '/api/v1/projectUser/update',
    method: 'put',
    data
  })
}

export function ProjectUserGet() {
  return request({
    url: '/api/v1/projectUser/get',
    method: 'get'
  })
}
