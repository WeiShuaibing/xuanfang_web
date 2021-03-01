import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAll() {
  return request({
    url: BASE_URL + 'huxing/getAll',
    method: 'GET'
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'huxing/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'huxing/getById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function savHuxing(obj) {
  return request({
    url: BASE_URL + 'huxing/save',
    method: 'POST',
    data: obj
  })
}
export function updateHuxing(obj) {
  return request({
    url: BASE_URL + 'huxing/update',
    method: 'POST',
    data: obj
  })
}
