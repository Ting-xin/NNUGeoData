import {createStore} from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import global from './modules/global'
import user from './modules/user'

export default createStore({
    ...global,
    modules: {
        user
    },
    plugins: [
        createPersistedstate({
          key: 'saveInfo',
          paths: ['user', 'catalog']
        })
      ]
})