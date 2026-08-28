import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'MArafatP - Digital Marketing Expert'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: 'smooth'
      }
    }
    return { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'MArafatP - Digital Marketing Portfolio'
  next()
})

export default router
