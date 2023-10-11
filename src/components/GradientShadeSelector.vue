<script setup>
defineEmits(['click'])

defineProps({
    color: {
        type: String,
        required: true,
    },
    shade: {
        type: Number,
        required: true,
    },
    selectedShade: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div>
        <h2 class="text-gray-500 font-normal my-2 dark:text-white">SHADE: {{ shade }}</h2>
        <ul class="grid grid-cols-5 gap-2">
            <li v-for="n in 9" :key="n" style="justify-self: center" @click="$emit('click', { shade: n })">
                <div
                    class="border dark:border-gray-700 rounded flex justify-center items-center w-9 h-9 cursor-pointer"
                    :class="`bg-${color}-${n}00`"
                >
                    <div
                        v-if="color && shade === Number(n * 100)"
                        class="rounded-full h-4 w-4"
                        :class="selectedShade"
                    ></div>
                </div>
            </li>
        </ul>
    </div>
</template>
