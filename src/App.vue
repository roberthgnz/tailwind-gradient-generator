<template>
  <div class="text-gray-500 bg-white">
    <navbar-vue></navbar-vue>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarVue from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    NavbarVue,
  },
}
</script>










