<script setup>
import { ref, watch } from 'vue'

const parsedValue = ref('')

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
})

watch(
    () => props.direction,
    () => {
        const reg = new RegExp(`bg-gradient-to-${props.direction}`, 'gi')
        parsedValue.value = parsedValue.value.replace(reg, '<code class="text-gray-900 dark:text-gray-200">$&</code>')
    },
)

watch(
    () => props.value,
    (newValue, oldValue) => {
        if (!oldValue) {
            parsedValue.value = newValue || props.value
            return
        }
        const diff = []
        const oldValueArr = oldValue.split(' ')
        const newValueArr = newValue.split(' ')
        for (let i = 0; i < oldValueArr.length; i++) {
            if (oldValueArr[i] !== newValueArr[i]) {
                diff.push(newValueArr[i])
            }
        }
        if (diff.length !== 1) {
            parsedValue.value = props.value
        }
        const reg = new RegExp(`(${diff[0]})`, 'gi')
        parsedValue.value = props.value.replace(reg, '<code class="text-gray-900 dark:text-gray-200">$&</code>')
    },
    { immediate: true },
)
</script>

<template>
    <button
        type="button"
        title="Click to copy to clipboard"
        class="w-full sm:w-auto flex-none bg-gray-50 text-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:hover:text-gray-200 hover:text-gray-900 font-mono leading-6 text-center py-3 px-6 border border-gray-200 rounded-lg flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"
    >
        <span class="hidden md:block font-bold text-center p-2" v-html="parsedValue"> </span>
        <span class="sr-only">(click to copy to clipboard)</span>
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path
                d="M8 16c0 1.886 0 2.828.586 3.414C9.172 20 10.114 20 12 20h4c1.886 0 2.828 0 3.414-.586C20 18.828 20 17.886 20 16v-4c0-1.886 0-2.828-.586-3.414C18.828 8 17.886 8 16 8m-8 8h4c1.886 0 2.828 0 3.414-.586C16 14.828 16 13.886 16 12V8m-8 8c-1.886 0-2.828 0-3.414-.586C4 14.828 4 13.886 4 12V8c0-1.886 0-2.828.586-3.414C5.172 4 6.114 4 8 4h4c1.886 0 2.828 0 3.414.586C16 5.172 16 6.114 16 8"
            />
        </svg>
    </button>
</template>
