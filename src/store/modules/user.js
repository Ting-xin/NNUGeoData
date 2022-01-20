import { deepClone } from "@/utils/littleUtils"
import { login } from '@/plugins/axios/api'
// 用户
export default {
    namespaced: true,
    state: {
        user: '',
        isLogin: false
    },
    mutations: {
        init(state) {
            state.user = ''
            state.isLogin = false
            localStorage.setItem('user', state.user)
            localStorage.setItem('isLogin', false)
        },
        set(state, user) {
            state.user = JSON.stringify(user)
            localStorage.setItem('user', state.user)
        },
        updateIsLogin(state) {
            state.isLogin = !state.isLogin
            localStorage.setItem('isLogin', state.isLogin)
        },
        getIsLogin(state) {
            return state.isLogin
        }
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