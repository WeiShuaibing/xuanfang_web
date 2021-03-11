import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAll() {
  return request({
    url: BASE_URL + 'fangyuan/getAll',
    method: 'GET',
    params: {
      loupanId: ''
    }
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'fangyuan/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'fangyuan/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function updateStatus(id, status) {
  return request({
    url: BASE_URL + 'fangyuan/updateStatus',
    method: 'GET',
    params: {
      id, status
    }
  })
}

export function save(obj) {
  return request({
    url: BASE_URL + 'fangyuan/save',
    method: 'POST',
    data: obj
  })
}
export function update(obj) {
  return request({
    url: BASE_URL + 'fangyuan/update',
    method: 'POST',
    data: obj
  })
}
