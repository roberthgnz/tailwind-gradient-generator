<script setup>
const year = new Date().getFullYear()
</script>

<template>
    <footer class="py-4 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <div class="container mx-auto flex-col xl:flex-row gap-4 flex items-center justify-between">
            <p>Copyright © {{ year }} Tailwind Gradient Generator</p>
            <p>
                Made with ☕ and 💖 by
                <a href="https://twitter.com/roberthgnz" target="_blank" rel="noopener noreferrer">Roberth González</a>
            </p>
        </div>
    </footer>
</template>
