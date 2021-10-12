<template>
  <div class="text-gray-500 bg-white dark:bg-blueGray-800">
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
