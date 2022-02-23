import {createRouter, createWebHistory} from 'vue-router'
import { ElMessage } from "element-plus";

import Navigation from '@/components/Navigation.vue'
import Register from '@/components/user/Register.vue'
import Login from '@/components/user/Login.vue'
import User from '@/components/user/User.vue'
import Data from '@/components/data/Data.vue'
import Tool from '@/components/tool/Tool.vue'
import Task from '@/components/task/Task.vue'
import Project from '@/components/project/Project.vue'
import Help from '@/components/Help.vue'
import { ElMessageBox } from 'element-plus';

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
                component: User
            },
            {
                path: '/data',
                name: 'data',
                component: Data
            },
            {
                path: '/tool',
                name: 'tool',
                component: Tool
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

router.beforeEach((to, from, next) => {     // 判断是否是登录状态
    if (to.path === '/login') {
      next();
    } else {
      let isLogin = localStorage.getItem("isLogin");
      if (!isLogin) {
        ElMessage('请先登录。')
        next('/login');
      } else {
        next();
      }
    }
  });



export default router;