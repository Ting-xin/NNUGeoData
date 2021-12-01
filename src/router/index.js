import {createRouter, createWebHistory} from 'vue-router'

import Navigation from '@/common/navigation.vue'
import Help from '@/components/help.vue'

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