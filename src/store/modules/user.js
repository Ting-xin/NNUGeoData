// 用户
export default {
    namespaced: true,
    state: {
        user: {
            id: '',
            catalogId: '',
            name: '',
            password: '',
            institution: '',
        }
    },
    mutations: {
        changeUser(state, user) {
            state.user = user
        },
        updateName(state, name) {
            state.user.name = name 
        },
        updatePassword(state, password) {
            state.user.password = password 
        },
        updateInstitution(state, institution) {
            state.user.institution = institution 
        },
    }
}