import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: 'http://10.208.8.154:8082/',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
 /*  withCredentials: true, // 检查跨站点访问控制
  changeOrigin: true//允许跨域 */
})

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
   /*  if (res.code == 1001) {
      Message({
        message: res.msg || 'success',
        type: 'success',
        duration: 5 * 1000
      })
    } else */ if (res.code == 1000) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('返回错误')
    }
    return res;
  },
  error => {
    console.log(error)
    Message({
      message: '接口异常',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject('接口异常')
  }
)

export default service
