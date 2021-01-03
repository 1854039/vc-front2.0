import Vue from 'vue'

import Router from 'vue-router'
import MyExpress from '../components/MyExpress.vue'
import Register from '../components/Register.vue'
import SearchExpress from '../components/SearchExpress.vue'
import Login from '../components/Login.vue'
import ExpressInfo from '../components/ExpressInfo.vue'

Vue.use(Router)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () =>
        // import(/* webpackChunkName: "about" */ '../views/About.vue')
        // }
        component: Register
    },
    {
        path: '/MyExpress',
        name: 'MyExpress',
        component: MyExpress
    },
    {
        path: '/SearchExpress',
        name: 'SearchExpress',
        component: SearchExpress
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/ExpressInfo',
        name: 'ExpressInfo',
        component: ExpressInfo
    },
]

export default new Router({
    routes
})