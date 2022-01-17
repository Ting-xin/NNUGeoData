import {createRouter, createWebHistory} from 'vue-router'

import Navigation from '@/common/Navigation.vue'
import Help from '@/components/Help.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'

const routes = [
    {
        path: '/',
        name: 'navigation',
        component: Navigation,
        children: [
            {
                path: '/help',
                name: 'help',
                component: Help
            },
            {
                path: '/register',
                name: 'register',
                component: Register
            },
            {
                path: '/login',
                name: 'login',
                component: Login
            }
        ]
    }
]

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: routes
})



export default router;