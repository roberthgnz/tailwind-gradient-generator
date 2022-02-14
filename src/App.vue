<template>
  <div
    class="dark:bg-slate-900 min-h-screen text-gray-500 bg-gray-100 dark:bg-slate-900"
  >
    <navbar-vue></navbar-vue>
    <router-view></router-view>
    <div id="notify"></div>
  </div>
</template>

<script>
import NavbarVue from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    NavbarVue,
  },
};
</script>
