<script setup>
defineEmits(['change'])

defineProps({
    stop: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="space-y-2">
        <h2 class="text-slate-400 font-normal dark:text-white text-sm">STOP POSITION (Optional)</h2>
        <input
            type="number"
            min="0"
            max="100"
            :placeholder="`${stop}-{position}`"
            class="w-full inline-flex bg-gray-50 text-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:hover:text-gray-200 hover:text-gray-900 font-mono leading-6 text-center py-1.5 px-3 border border-gray-200 rounded-lg items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200 text-sm"
        />
    </div>
</template>
