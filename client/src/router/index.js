import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import KanbanPage from '../views/KanbanPage.vue'
import _404Page from '../views/_404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/',
    name: 'kanban',
    component: KanbanPage
  },
  {
    path: '*',
    name: '_404',
    component: _404Page
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name === 'kanban' && isAuthenticated) next()
  else if (to.name === 'kanban' && !isAuthenticated) next('/login')
  else if ((to.name === 'register' || to.name === 'login') && isAuthenticated) next('/')
  else next()
})

export default router
