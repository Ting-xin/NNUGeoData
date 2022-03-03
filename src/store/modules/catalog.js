// 目录,通过快照式实现撤销与重做
export default {
  namespaced: true,
  state: {
    cursor: -1,
    stackCatalog: [],
  },
  mutations: {
    init(state) {
      state.cursor = -1
      state.stackCatalog = []
    },
    setRoot(state, catalogId) {
      state.cursor = 0
      state.stackCatalog.push(catalogId)
    },
    record(state, catalogId) {
      while(state.cursor < state.stackCatalog.length - 1) {
        state.stackCatalog.pop()
      }
      state.stackCatalog.push(catalogId)
    },
    redo(state) {
      if(state.cursor < state.stackCatalog.length - 1)
        state.cursor += 1
      return state.stackCatalog[state.cursor]
    },
    undo(state) {
      if(state.cursor > -1) 
        state.cursor -= 1
      return state.stackCatalog[state.cursor]
    }
  },
  getters: {
    getCatalogId(state) {
      return state.stackCatalog[state.cursor]
    }
  }
}