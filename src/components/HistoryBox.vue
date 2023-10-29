<script setup>
import { copyToClipboard } from '../helpers/index.js'
import { Notify } from '@reliutg/buzz-notify/dist/esm/index'
import '@reliutg/buzz-notify/dist/buzz-notify.css'

const $emit = defineEmits(['edit', 'remove'])

defineProps({
    history: {
        type: Array,
        required: false,
        default() {
            return []
        },
    },
})

const copyHistoryItem = (classes) => {
    copyToClipboard(classes, () => {
        Notify({
            title: 'Copied',
            type: 'success',
            position: 'bottom-center',
            duration: 1500,
            config: {
                icons: {
                    success: '🎉',
                },
            },
        })
    })
}

const getStopValues = (classes, stop) => {
    const _classes = classes.split(' ').slice(1).join(' ')

    const index = _classes.indexOf(stop)

    const [, color, shade] = _classes.slice(index).split(' ')[0].split('-')

    return { color, shade: shade / 100 }
}

const handleEditHistory = (classes) => {
    const from = getStopValues(classes, 'from')
    const via = getStopValues(classes, 'via')
    const to = getStopValues(classes, 'to')
    const direction = classes.split(' ')[0].split('-').at(-1)

    $emit('edit', { from, via, to, direction })
}

const handleRemoveHistory = (classes) => {
    $emit('remove', classes)
}
</script>

<template>
    <div
        v-if="history.length > 0"
        class="w-full rounded-lg shadow-sm border p-6 my-8 mx-auto relative dark:border-gray-700 dark:text-white"
    >
        <h3 class="text-gray-500 font-normal md:mb-4 text-center dark:text-white">SAVED GRADIENTS</h3>
        <span
            class="block text-gray-400 font-thin md:absolute md:top-0 md:right-0 p-3 text-center cursor-pointer dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
            @click="handleRemoveHistory(history)"
            >Remove all</span
        >
        <ul class="h-56 overflow-y-auto text-center space-y-2 my-8">
            <li v-for="item in history" :key="item">
                <div class="flex justify-between items-center mx-auto rounded px-2 py-1">
                    <code
                        class="bg-clip-text text-center md:text-left leading-7 pr-1 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                        title="Click to copy"
                        @click="copyHistoryItem(item)"
                    >
                        {{ item }}
                    </code>
                    <div class="space-x-2">
                        <button
                            type="button"
                            class="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                            title="Remove"
                            @click="handleEditHistory(item)"
                        >
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 1024 1024"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
                                ></path>
                            </svg>
                        </button>
                        <button
                            type="button"
                            class="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                            title="Remove"
                            @click="handleRemoveHistory([item])"
                        >
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
