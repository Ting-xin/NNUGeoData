import service from '@/utils/request';

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

// 删除文件夹
export function deleteFolder(data) {
    return service.delete('/catalog', {params: data})
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