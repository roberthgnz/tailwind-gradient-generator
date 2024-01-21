<script setup>
import { encode } from 'js-base64'
import { toRaw } from 'vue'

const props = defineProps({
    direction: {
        type: String,
    },
    stop: {
        type: Object,
    },
})

const normalizeStop = (stop) => {
    const _stop = structuredClone(toRaw(stop))
    return Object.keys(_stop).reduce((acc, key) => {
        const value = _stop[key]

        value.shade = value.shade / 100

        return {
            ...acc,
            [key]: value,
        }
    }, {})
}

const onShare = async () => {
    try {
        if ('share' in navigator) {
            const endcoded = encode(JSON.stringify({ stop: normalizeStop(props.stop), direction: props.direction }))
            await navigator.share({
                title: document.title,
                text: 'Check this gradient. You will love it!',
                url: `${window.location.origin}?g=${endcoded}`,
            })
        }
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <button
        class="w-full sm:w-auto flex-none bg-gray-50 text-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:hover:text-gray-200 hover:text-gray-900 font-mono leading-6 text-center py-2.5 px-4 border border-gray-200 rounded-lg flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200 space-x-4"
        @click="onShare"
    >
        <span class="hidden md:block font-bold text-center">Share</span>
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
