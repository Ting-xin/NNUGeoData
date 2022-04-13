import { service } from '@/utils/request'

export {
  getCatalog,
  findByIdAndPage,
  findByItems,
  findChildrenData,
  createCatalog,
  deleteFolder,
  editCatalog,
  shareData
}

// 根据 id 查询目录
function getCatalog(id) {
  return service.get('/catalog', {
      params:{
          id: id
      }
  })
}

// 根据 id 和 page信息 查询目录
function findByIdAndPage(id, pageInfo) {
  return service({
    url: '/catalog/findByIdAndPage',
    method: 'post',
    params: {
      id: id
    },
    data: pageInfo
  })
}

// 根据 id search content  和 page 查询目录
function findByItems(id, item, content, pageInfo) {
  return service({
    url: 'catalog/findByItems',
    method: 'post',
    params:{
      id: id,
      item: item,
      content: content,
    },
    data: pageInfo
  })
}

// 根据 id 返回 childrenData
function findChildrenData(catalogId, id) {
  return service.get('catalog/findChildrenData', {params: {catalogId: catalogId, id: id}})
}

// 新建文件夹
function createCatalog(data) {
  return service.post('/catalog', data)
}

// 删除文件夹
function deleteFolder(data) {
  return service.delete('/catalog', {params: data})
}

//编辑文件夹
function editCatalog(id, catalogId,name,description){
  return service({
    url: '/catalog/update',
    method: 'post',
    params: {
      id: id,
      catalogId:catalogId,
      name:name,
      description:description
    },
  })
}

// 根据父目录和 childrenData 复制文件夹
function shareData(id, childrenData) {
  return service({
    url: '/catalog/copy',
    method: 'post',
    params: {
      catalogId: id,
    },
    data: childrenData,
  })
}

