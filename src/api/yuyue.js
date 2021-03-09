import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getYuyuInfoOfAdviser(status) {
  return request({
    url: BASE_URL + 'yuyue/getYuyuInfoOfAdviser',
    method: 'GET',
    params: {
      status
    }
  })
}
export function changeStatus(id, status) {
  return request({
    url: BASE_URL + 'yuyue/changeStatus',
    method: 'GET',
    params: {
      id, status
    }
  })
}
