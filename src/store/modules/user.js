import { deepClone } from "@/utils/littleUtils"
import { login } from '@/plugins/axios/api'
// 用户
export default {
    namespaced: true,
    state: {
        user: {
            id: '',
            catalogId: '',
            name: '',
            password: '',
            institution: ''
        },
        isLogin: false
    },
    mutations: {
        init(state) {
            state.user.id = ''
            state.user.catalogId = ''
            state.user.name = ''
            state.user.password = ''
            state.user.institution = ''
            state.user.isLogin = false
            localStorage.setItem('isLogin', state.isLogin)
            localStorage.setItem('user', state.user)
        },
        set(state, user) {
            state.user.id = user.id
            state.user.catalogId = user.catalogId
            state.user.name = user.name
            state.user.password = user.password
            state.user.institution = user.institution
            localStorage.setItem('user', state.user)
        },
        updateIsLogin(state) {
            localStorage.setItem('isLogin', !state.isLogin)
            state.isLogin = !state.isLogin
        },
        getIsLogin(state) {
            return state.isLogin
        },
        updateName(state, name) {
            state.user.name = name 
            localStorage.setItem('user', state.user)
        },
        updatePassword(state, password) {
            state.user.password = password 
            localStorage.setItem('user', state.user)
        },
        updateInstitution(state, institution) {
            state.user.institution = institution 
            localStorage.setItem('user', state.user)
        },
    },
    // actions: {
    //     loginAndStore({ commit }, data) {
    //         return new Promise((resolve, reject) => {
    //             login(data)
    //              .then(res => {
    //                  commit('set', res)
    //                  resolve(data)
    //              })
    //              .catch(err => {
    //                  reject(err)
    //              })
    //         })
    //     }
    // }
}