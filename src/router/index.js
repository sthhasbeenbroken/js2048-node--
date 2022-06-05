import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path:'/admin',
    component:()=>import('@/components/admin/HomeView'),  
  },
  {
    path:'/search',
      component:()=>import('@/components/admin/SearchView')
  },
  {
    path:'/insert',
    component:()=>import('@/components/admin/InsertView')
  },
  {
    path:'/user',
    component:()=>import('@/components/user/HomeView')
  },
  {
    path:'/2048',
    component:()=>import('@/components/user/GameView')
  },
  {
    path:'/rank',
    component:()=>import('@/components/RankView')
  }

]

const router = new VueRouter({
  routes
})

export default router
