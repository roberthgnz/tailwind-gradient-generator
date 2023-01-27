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
        @click="onShare()"
        class="w-full sm:w-auto flex-none bg-gray-50 text-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:hover:text-gray-200 hover:text-gray-900 font-mono leading-6 text-center py-3 px-6 border border-gray-200 rounded-xl flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"
    >
        <span class="hidden md:block font-bold text-center p-2">Share Gradient</span>
        <span class="sr-only">(share gradient)</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 stroke-2 -rotate-45"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
        </svg>
    </button>
</template>
