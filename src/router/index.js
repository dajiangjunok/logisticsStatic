import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/home',
    // name: 'Home',
    component: () => import('../views/home/Menu.vue'),
    children: [
      {
        path: '/',
        redirect: '/userInfo'
      },
      {
        path: '/userInfo',
        component: () => import('../views/home/childCpn/UserInfo.vue'),
      },
      {
        path: '/bankInfo',
        component: () => import('../views/home/childCpn/BankInfo.vue'),
      },
      {
        path: '/payInfo',
        component: () => import('../views/home/childCpn/PayInfo.vue'),
      },

      {
        path: '/expressInfo',
        component: () => import('../views/home/childCpn/ExpressInfo.vue'),
      },
      {
        path: '/payHistory',
        component: () => import('../views/home/childCpn/PayHistory.vue'),
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
