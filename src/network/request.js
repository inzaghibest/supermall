import axios from 'axios'

export function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  return instance(config)
}
// 2.axios拦截器
//   instance.interceptors.request.use(config => {
//     console.log(config)
//     return config
//   }, err => {
//     console.log(err)
//   })

//   // 响应拦截
//   instance.interceptors.response.use(res => {
//     console.log('响应成功')
//     return res
//   }, err => {
//     return err
//   })

//   return instance(config)
// }
