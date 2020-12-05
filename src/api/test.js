import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function testInfo() {
  return request({
    url: BASE_URL + 'test/info',
    method: 'GET'
  })
}
