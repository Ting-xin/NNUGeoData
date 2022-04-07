import {createRouter, createWebHistory} from 'vue-router'
// import { ElMessage } from "element-plus";

import Navigation from '@/view/navigation.vue'
import Register from '@/view/user/register.vue'
import Login from '@/view/user/login.vue'
import User from '@/view/user/userSpace.vue'
import UserTool from '@/view/user/userTool.vue'
import UserInfo from '@/view/user/user.vue'
import Data from '@/view/data/data.vue'
import Tool from '@/view/tool/tool.vue'
import Task from '@/view/task/task.vue'
import Project from '@/view/project/project.vue'
import Help from '@/view/help/help.vue'
import { ElMessageBox } from 'element-plus';
import InvokeTool from "@/view/tool/components/invokeTool"

const routes = [
    {
        path: '/',
        name: 'navigation',
        component: Navigation,
        children: [
            {
                path: '/register',
                name: 'register',
                component: Register
            },
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/user',
                name: 'user',
                component: User,
                children:[
                    {
                        path: '/save',
                        name: 'save',
                        component: UserTool
                    },
                    {
                        path: '/info',
                        name: 'info',
                        component: UserInfo
                    },
                    {
                        path: '/dataSpace',
                        name: 'dataSpace',
                        component: Data
                    },
                ],
            },
            {
                path: '/data',
                name: 'data',
                component: Data
            },
            {
                path: '/tool',
                name: 'tool',
                component: Tool,
                children:[
                    {
                        path:'/tool/invokeTool',
                        name:'invokeTool',
                        component:InvokeTool
                    }
                ]
            },
            {
                path: '/task',
                name: 'task',
                component: Task
            },
            {
                path: '/project',
                name: 'project',
                component: Project
            },
            {
                path: '/help',
                name: 'help',
                component: Help
            },
        ]
    }
]

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: routes
})


export default router;
