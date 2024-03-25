<template>
    <Navbar />
    <router-view></router-view>
    <Footer />
    <div data-notify></div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'App',
    components: {
        Navbar,
        Footer,
    },
}
</script>

<style>
:root {
    --navbar-height: 64px;
    --footer-height: 72px;
    --content-height: calc(100vh - var(--navbar-height) - var(--footer-height));
}
</style>
