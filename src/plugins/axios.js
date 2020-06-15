import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from "element-ui";
// axios.defaults.baseURL = 'http://localhost:9999' /*这里的地址就是刚刚启起来的服务器地址  */ //遇到上传图片等，需在上传的页面引入axios单独处理，重新设置请求头等

// Loading的option
const options = {
    text: '载入中...',
    background: 'rgba(255,255,255,0.6)',
    spinner: 'el-icon-loading',
    lock: true,
}
const baseURL = 'http://localhost:9527/v1';
const config = {
        withCredentials: true,
        baseURL: baseURL, // 这里的地址就是刚刚启起来的服务器地址 
        timeout: 10000
    }
    //需要加loading的接口地址
const _axios = axios.create(config)

/*请求拦截*/
_axios.interceptors.request.use(
        config => {
            console.log(config)
            if (config.method === 'post' && !(config.data instanceof FormData)) {
                config.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
            }
           

            return config
        }, error => {
            return Promise.reject(error)
        }
    )
    /* 响应拦截 */
_axios.interceptors.response.use(
    res => {
        if (res.data.code === 0) {
            return res.data
        } else {
            Message.error(res.data.msg)
            return Promise.reject(res)
        }

    }, err => {
        return Promise.resolve(err)
    }
)
export default _axios /*记得导出*/