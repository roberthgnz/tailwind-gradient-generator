import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/Home"
import Presets from "../views/Presets"

const routes = [
  { path: "/", component: Home },
  { path: "/presets", component: Presets },
  {
    path: "/gradient",
    name: "gradient",
    component: Home,
    props: (route) => ({
      query: route.query.colors,
      direction: route.query.direction,
    }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default { router }
