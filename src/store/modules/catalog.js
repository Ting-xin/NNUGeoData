import {deepClone} from '@/utils/littleUtils'
// 目录
export default {
  namespaced: true,
  state: {
    catalog: {
      id: '',
      parentId: '',     
      userId: '',
      name: '',
      level: 0,
    },
    dataList: [],
    stackCatalog: [],
  },
  mutations: {
    init(state) {
      state.catalog.id = ''
      state.catalog.parentId = ''
      state.catalog.userId = ''
      state.catalog.name = ''
      state.catalog.level = 0
      state.catalog.dataList = []
      state.catalog.stackCatalog = []
      localStorage.setItem('catalog', state.catalog)
      localStorage.setItem('dataList', state.dataList)
      localStorage.setItem('stackCatalog', state.stackCatalog)
    },
    setCatalog(state, root) {
      state.catalog.id = root.id
      state.catalog.parentId = root.parentId
      state.catalog.userId = root.userId
      state.catalog.name = root.name
      state.catalog.level = root.level
      setDataList(state, root.children)
      localStorage.setItem('catalog', state.catalog)
    },
    setDataList(state, list) {
      state.dataList = []  // 不知道怎么垃圾回收，也赶时间，，，
      for(let i of list) {
        state.dataList.push(i)
      }
      localStorage.setItem('dataList', state.dataList)
    },
    pushStackCatalog(state, data) {
      let temp = deepClone(data, temp)
      state.stackCatalog.push(temp)
      localStorage.setItem('stackCatalog', state.stackCatalog)
    },
    pullStackCatalog(state, data) {
      if(state.stackCatalog.length > 0) {
        let data = state.stackCatalog.splice(-1, 1)[0]
        this.setCatalog(state, data)
        localStorage.setItem('stackCatalog', state.stackCatalog)
      }
    }
  }
}