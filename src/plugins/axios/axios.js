import axios from "axios";
import {
    ElMessage
} from "element-plus";

const service = axios.create({
    baseURL: "/api",
    timeout: 50000
});

// 数据请求拦截
service.interceptors.request.use((config) => {

    return config;
}, (error) => {
    return Promise.reject(error);
});

// 返回响应数据拦截
service.interceptors.response.use((res) => {
    const data = res.data;
    // 状态码为 2xx 范围时都会调用该函数，处理响应数据
    if (res.status === 200) {
        const code = data.code;
        return Promise.resolve(data);
    }
}, (error) => {
    if (error.response.status) {
        // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
        switch (error.response.status) {
            case 400:
                ElMessage({
                    type: 'error', 
                    message: '请求参数错误！',
                    showClose: true 
                })
            case 404:
                ElMessage({
                    type: 'error',
                    message: '请求资源错误！',
                    showClose: true
                });
                break;
            case 500:
                ElMessage({
                    type: 'error',
                    message: '服务器内部报错！',
                    showClose: true
                });
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
});


export default service;