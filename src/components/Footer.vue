<script setup>
const year = new Date().getFullYear()
</script>

<template>
    <footer
        class="container mx-auto py-16 flex-col xl:flex-row space-y-4 flex items-center justify-between dark:text-gray-400"
    >
        <p>
            Made with ☕ and 💖 by
            <a href="https://twitter.com/roberthgnz" target="_blank" rel="noopener noreferrer">Roberth González</a>
        </p>
        <p>Copyright © {{ year }} Tailwind Gradient Generator</p>
    </footer>
</template>
