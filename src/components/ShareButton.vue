<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()

const props = defineProps({
    direction: {
        type: String,
        default: 't',
    },
    value: {
        type: String,
        default: '',
    },
})

const isFirstVisit = computed(() => $router.currentRoute.value.fullPath === '/')

const onShare = async () => {
    const url = new URL('https://twitter.com/intent/tweet')
    try {
        const queryParams = new URLSearchParams()
        if (isFirstVisit.value) {
            let colors = props.value // e.g "bg-gradient-to-br from-slate-900 via-pink-200 to-green-100";
            colors = colors
                .replaceAll(/(bg-gradient-to-)[a-zA-Z]{1,2}/g, '')
                .replaceAll(/(from-|via-|to-)/g, '')
                .trim()
                .split(' ')
                .join(',')
            queryParams.append('colors', colors)
            queryParams.append('direction', props.direction)
        }
        const baseURL = 'https://tailwind-gradient-generator.vercel.app'
        const currentPath = isFirstVisit.value
            ? `/gradient?${queryParams.toString()}`
            : $router.currentRoute.value.fullPath

        url.searchParams.append('url', baseURL + currentPath)
        url.searchParams.append('text', 'Check this gradient. You will love it!')
        url.searchParams.append('hashtags', 'TailwindGradientGenerator')

        // Check if Web Share API is available. If it is not supported, share it in the traditional way
        if ('share' in navigator) {
            await navigator.share({
                title: document.title,
                text: 'Check this gradient. You will love it!',
                url: baseURL + currentPath,
            })
        } else {
            // Fallback sharing option
            window.open(url, '_blank')
        }
    } catch (error) {
        console.error(error)
        // Failed to share it. Fallback sharing option
        window.open(url, '_blank')
    }
}
</script>

<template>
    <button
        class="w-full sm:w-auto flex-none bg-gray-50 text-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:hover:text-gray-200 hover:text-gray-900 font-mono leading-6 text-center py-3 px-6 border border-gray-200 rounded-lg flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"
        @click="onShare"
    >
        <span class="hidden md:block font-bold text-center p-2">Share</span>
        <span class="sr-only">(share gradient)</span>
        <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
    </button>
</template>
