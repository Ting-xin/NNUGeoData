import service from './axios.js';
import qs from 'qs'

// 注册用户
export function register(data) {
    return service.post('/user', data)
}

// 登录
export function login(data) {
    return service.post('/user/login', data)
}

// 获取根目录
export function getRootCatalog(id) {
    return service.get('/catalog', {
        params:{
            id: id
        }
    })
}