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

// 查询目录
export function getRootCatalog(id) {
    return service.get('/catalog', {
        params:{
            id: id
        }
    })
}

// 新建文件夹
export function createCatalog(data) {
    console.log('createCatalog: ', data)
    return service.post('/catalog', data)
}

// 上传文件
export function updateFile(data) {
    console.log('uploadFile: ', data)
    return service.post('/file', data, {headers: {'ContentType': "multipart/form-data"}})
}

// 下载文件
export function downloadFile(data) {
    // return service.get('/file/download', {params: data})
    return new Promise((resolve, reject) => {
        try {
            window.location.href = '/api/file/download?id=' + data.id + '&catalogId=' + data.catalogId
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

// 删除文件
export function deleteFile(data) {
    return service.delete('/file', {params: data})
}

// 删除文件夹
export function deleteFolder(data) {
    return service.delete('/catalog', {params: data})
}