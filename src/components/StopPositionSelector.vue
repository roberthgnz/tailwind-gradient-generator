<script setup>
import { computed } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const props = defineProps({
    stop: {
        type: String,
        required: true,
    },
})

const modelValue = defineModel()

const positionValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

const options = computed(() => {
    return positionValues.map((position) => {
        return { value: `${props.stop}-${position}%` }
    })
})

const selectedOption = computed({
    get() {
        return { value: modelValue.value ?? 'Select position' }
    },
    set(newValue) {
        return (modelValue.value = newValue.value)
    },
})
</script>

<template>
    <div class="space-y-2">
        <h2 class="text-slate-400 font-normal dark:text-white text-sm">STOP POSITION (Optional)</h2>
        <Listbox v-model="selectedOption">
            <div class="relative mt-1">
                <ListboxButton
                    class="relative w-full inline-flex bg-gray-50 text-black dark:bg-gray-900 dark:border-gray-700 dark:hover:text-gray-200 hover:text-gray-900 leading-6 text-center py-1.5 px-3 border border-gray-200 rounded-lg items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200 text-xs"
                >
                    <span class="block truncate">{{ selectedOption.value }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg
                            class="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                            />
                        </svg>
                    </span>
                </ListboxButton>

                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    >
                        <ListboxOption
                            v-slot="{ active, selected }"
                            v-for="option in options"
                            :key="option.value"
                            :value="option"
                            as="template"
                        >
                            <li
                                :class="[
                                    active ? 'bg-slate-100 text-slate-900' : 'text-gray-900',
                                    'relative cursor-default select-none text-left py-2 pr-10 pl-4 text-xs',
                                ]"
                            >
                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                    option.value
                                }}</span>
                                <span
                                    v-if="selected"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-900"
                                >
                                    <svg
                                        class="h-[14px] w-[14px]"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m4.5 12.75 6 6 9-13.5"
                                        />
                                    </svg>
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>
