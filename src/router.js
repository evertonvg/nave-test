import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import Add from './components/AddNaver'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {path:'/home',component: Home},
        {path:'/login',component: Login},
        {path:'/add',component: Add},
        {path:'/update/:id/:name/:birthdate/:admission_date/:project/:job_role/:url',component: Add},
        {path:'*',component:Home}
    ]
})