import {deepClone} from '@/utils/deepClone'
// 目录
export default {
  namespaced: true,
  state: {
    catalog: '',
    dataList: '',
    stackCatalog: [],
  },
  mutations: {
    init(state) {
      state.catalog = ''
      state.dataList = ''
      state.stackCatalog = []
      localStorage.setItem('catalog', state.catalog)
      localStorage.setItem('dataList', state.dataList)
      localStorage.setItem('stackCatalog', state.stackCatalog)
    },
    setCatalog(state, root) {
      state.catalog= JSON.stringify(root)
      localStorage.setItem('catalog', state.catalog)
    },
    setDataList(state, list) {
      state.dataList = JSON.stringify(list)
      localStorage.setItem('dataList', state.dataList)
    },
    pushStackCatalog(state, data) {
      state.stackCatalog.push(JSON.stringify(data))
      localStorage.setItem('stackCatalog', state.stackCatalog)
    },
    pullStackCatalog(state, data) {
      if(state.stackCatalog.length > 0) {
        state.catalog = state.stackCatalog.splice(-1, 1)[0]
        localStorage.setItem('stackCatalog', state.stackCatalog)
      }
    }
  }
}