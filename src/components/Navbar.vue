<script setup>
import { computed, onMounted, ref } from 'vue'
import Lsdb from '@reliutg/lsdb'

const database = ref(null)

const theme = computed(() => {
    if (!database.value) {
        return null
    }
    return database.value.all('theme')[0].theme
})

onMounted(() => {
    database.value = new Lsdb('tailwind-gradient-generator')

    database.value.collection('theme')

    if (database.value.all('theme').length === 0) {
        database.value.insert('theme', { theme: 'light' })
    }

    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches

    document.querySelector('html').classList.toggle('dark', theme.value !== 'light' && prefersColorScheme)
})

const toggleTheme = () => {
    const THEMES = {
        light: 'dark',
        dark: 'light',
    }
    database.value.update('theme', { theme: theme.value }, { theme: THEMES[theme.value] })
    document.querySelector('html').classList.toggle('dark', theme.value !== 'light')
}
</script>

<template>
    <header class="bg-white border-b border-gray-200 dark:bg-slate-900 dark:border-gray-700">
        <nav class="container mx-auto py-4 flex items-center justify-between flex-wrap md:flex-row md:flex-nowrap">
            <h1 class="flex justify-center md:justify-start w-full">
                <svg
                    class="h-8 w-8 mr-2 text-gray-800 dark:text-white"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
                    />
                </svg>
                <router-link to="/">
                    <span class="text-xl tracking-tight text-gray-800 font-bold dark:text-white">
                        Tailwind Gradient Generator
                    </span>
                </router-link>
            </h1>
            <ul class="flex items-center text-base justify-center w-full md:w-auto space-x-4">
                <li>
                    <a
                        aria-label="GitHub Respository"
                        href="https://github.com/roberthgnz/tailwind-gradient-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg
                            class="w-5 h-5 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z"
                            ></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <button type="button" class="flex" title="Toggle theme" @click="toggleTheme">
                        <svg
                            v-if="theme === 'light'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 hover:text-gray-900"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <svg
                            v-if="theme === 'dark'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-white hover:text-gray-200"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    </header>
</template>
