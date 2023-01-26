import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes = [
  { path: '/', component: Home },
  {
    path: '/gradient',
    name: 'gradient',
    component: Home,
    // user will be able to enter the url as "/gradient?colors=red-300,teal-200,indigo-800" or "/gradient?colors=red-300,teal-200,indigo-800&direction=t"
    props: (route) => ({
      colors: route.query.colors,
      direction: route.query.direction,
    }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
