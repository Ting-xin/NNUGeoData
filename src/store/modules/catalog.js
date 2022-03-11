// 目录,通过快照式实现撤销与重做
export default {
  namespaced: true,
  state: {
    cursor: 0,
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
      console.log("stack: ", state.stackCatalog)
      console.log('cursor: ', state.cursor)
      while(state.cursor < state.stackCatalog.length) {
        state.stackCatalog.pop()
      }
      state.cursor = state.stackCatalog.length - 1
      console.log("stack: ", state.stackCatalog)
      console.log('cursor: ', state.cursor)
      state.stackCatalog.push(catalogId)
    },
    redo(state) {
      if(state.cursor < state.stackCatalog.length - 1)
        state.cursor += 1
    },
    undo(state) {
      console.log("stack: ", state.stackCatalog.length)
      console.log('cursor: ', state.cursor)
      if(state.cursor > 0) 
        state.cursor -= 1
    }
  },
  getters: {
    getCatalogId(state) {
      return state.stackCatalog[state.cursor]
    }
  }
}