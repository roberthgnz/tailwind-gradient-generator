<template>
  <div class="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
    <Navbar />
    <router-view></router-view>
    <div data-notify></div>
  </div>
</template>

<script>
import { inject } from "@vercel/analytics";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  mounted() {
    inject()
  }
};
</script>
