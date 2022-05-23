import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
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
    path:'/user',
    component:()=>import('@/components/user/HomeView')
  },
  {
    path:'/2048',
    component:()=>import('@/components/user/GameView')
  }

]

const router = new VueRouter({
  routes
})

export default router
