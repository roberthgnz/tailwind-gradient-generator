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
        <h2 class="text-gray-500 font-normal dark:text-white">STOP POSITION (Optional)</h2>
    </div>
</template>
