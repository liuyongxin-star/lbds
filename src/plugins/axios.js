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
    target: '.right-container' // target指定需要覆盖的 DOM 节点，会获取到问的那个中第一个类名为right-container的元素
}
let loadingInstance;
const baseURL = 'http://localhost:9527';
const config = {
        withCredentials: true,
        baseURL: baseURL, // 这里的地址就是刚刚启起来的服务器地址 
        timeout: 2500
    }
    //需要加loading的接口地址
const urls = ['/banner', '/personalized', '/personalized/privatecontent', '/personalized/newsong'];
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
            if (urls.includes(config.url)) {
                loadingInstance = Loading.service(options); // 以服务的方式调用的 Loading
            }

            return config
        }, error => {
            return Promise.reject(error)
        }
    )
    /* 响应拦截 */
_axios.interceptors.response.use(
    res => {
        if (urls.includes(res.config.url)) {
            loadingInstance.close(); //关闭Loading
        }
        if (res.data.code === 200) {
            return res
        } else if (res.data.code === 301) {
            Message.error("请先登录");
        } else {
            Message.error("请求错误")
        }

    }, err => {
        return Promise.resolve(err)
    }
)
export default _axios /*记得导出*/