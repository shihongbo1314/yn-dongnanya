import request from '@/utils/request'

export function getImgList(params) {
  return request({
    url: '/s2s/img',
    method: 'post',
    params  
  })
}
