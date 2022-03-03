import storage from '@/utils/storage'
// 用户
export default {
    namespaced: true,
    // 数据保存在state内，在任何组件内通过this.$store.state.XX来读取
    state: {
        user: '',
    },
    // 用来直接修改state内的数据；在组件内，通过this.$store.commit(方法名)来执行mutations
    mutations: {
        init(state) {
            state.user = ''
            storage.remove('user')
        },
        setUser(state, user) {
            state.user = JSON.stringify(user)
            storage.set('user', state.user)
        },
    },
    getters: {
        getUser(state) {
            state.user = storage.get('user')
            return JSON.parse(state.user)
        },
        getUserId(state) {
            state.user = storage.get('user')
            return JSON.parse(storage.get('user'))._id
        },
        getCatalogId(state) {
            state.user = storage.get('user')
            return JSON.parse(storage.get('user')).catalogId
        },
        getName(state) {
            state.user = storage.get('user')
            return JSON.parse(storage.get('user')).name
        },
        getInstitution(state) {
            state.user = storage.get('user')
            return JSON.parse(storage.get('user')).institution
        },
        getDate(state) {
            state.user = storage.get('user')
            return JSON.parse(storage.get('user')).date
        },
    }
}