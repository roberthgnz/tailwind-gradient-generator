<script setup>
import { computed } from 'vue'
import {
    SelectContent,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectPortal,
    SelectRoot,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from 'radix-vue'
import ChevronDown from './icons/ChevronDown.vue'
import ChevronUp from './icons/ChevronUp.vue'
import Check from './icons/Check.vue'

const props = defineProps({
    stop: {
        type: String,
        required: true,
    },
})

const modelValue = defineModel()

const positionValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

const options = computed(() => {
    return positionValues.map((position) => `${props.stop}-${position}%`)
})
</script>

<template>
    <div class="space-y-2">
        <h2 class="text-slate-400 font-normal dark:text-white text-sm">STOP POSITION (Optional)</h2>
        <SelectRoot v-model="modelValue">
            <SelectTrigger
                class="relative w-full inline-flex bg-gray-50 text-black dark:bg-gray-900 dark:border-gray-700 gap-2 dark:text-white dark:hover:text-gray-200 hover:text-gray-900 leading-6 text-center py-1.5 px-3 border border-gray-200 rounded-lg items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200 text-xs"
                aria-label="Customise position"
            >
                <SelectValue placeholder="Select position" />
                <ChevronDown class="size-3.5" />
            </SelectTrigger>
            <SelectPortal>
                <SelectContent
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    :side-offset="5"
                >
                    <SelectScrollUpButton
                        class="flex items-center justify-center h-[25px] bg-white dark:bg-gray-900 dark:text-white text-violet11 cursor-default"
                    >
                        <ChevronUp />
                    </SelectScrollUpButton>
                    <SelectViewport>
                        <SelectItem
                            v-for="option in options"
                            :key="option.value"
                            :value="option"
                            class="dark:text-white text-gray-900 relative cursor-pointer select-none text-left py-2 pr-10 pl-4 text-xs transition"
                        >
                            <SelectItemText>{{ option }}</SelectItemText>
                            <SelectItemIndicator
                                class="absolute right-[20px] w-[20px] translate-x-1/2 inline-flex items-center justify-center"
                            >
                                <Check />
                            </SelectItemIndicator>
                        </SelectItem>
                    </SelectViewport>
                </SelectContent>
            </SelectPortal>
        </SelectRoot>
    </div>
</template>

<style>
[data-highlighted],
[data-state='checked'] {
    @apply bg-slate-100 outline-none font-semibold dark:bg-gray-800;
}
</style>
