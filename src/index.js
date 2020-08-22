import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./routes";

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: "history",
});

Vue.use(VueRouter);

new Vue({ el: "#app", router, render: (h) => h(App) });
