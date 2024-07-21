<template>
    <Navbar />
    <router-view></router-view>
    <Footer />
    <Toaster position="bottom-center" rich-colors />
</template>

<script>
import { Toaster } from 'vue-sonner'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'App',
    components: {
        Navbar,
        Footer,
        Toaster
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
