<template>
    <div class="home">
        <Hero />
        <div class="grid md:grid-cols-2 gap-8 container mx-auto px-4 xl:px-0 mb-32">
            <div class="space-y-4">
                <div ref="gradientContainer" class="relative rounded-lg h-[33.33vh]" :class="classes">
                    <DirectionController :direction="direction" @click="handleDirection">
                        <button type="button" title=" Generate random gradient" @click="generateRandomGradient">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-refresh-cw"
                            >
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <polyline points="1 20 1 14 7 14"></polyline>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                            </svg>
                        </button>
                    </DirectionController>
                </div>
                <div class="flex flex-col xl:flex-row flex-wrap items-center w-full justify-center gap-2">
                    <ClassOutput :value="classes" :direction="direction" @click="copyClasses" />
                    <ShareButton :direction="direction" :value="classes" />
                </div>
            </div>
            <div>
                <div class="w-full grid md:grid-cols-3 gap-4">
                    <GradientSelector
                        :title="'Starting color'"
                        :colors="colors"
                        :color="stop.from.color"
                        :stop="'from'"
                        :shade="stop.from.shade"
                        :target="target"
                        @color-selected="handleColorStop"
                        @shade-selected="handleColorShade"
                    />

                    <GradientSelector
                        :title="'Middle color'"
                        :colors="colors"
                        :color="stop.via.color"
                        :stop="'via'"
                        :shade="stop.via.shade"
                        :target="target"
                        @color-selected="handleColorStop"
                        @shade-selected="handleColorShade"
                    />

                    <GradientSelector
                        :title="'Ending color'"
                        :colors="colors"
                        :color="stop.to.color"
                        :stop="'to'"
                        :shade="stop.to.shade"
                        :target="target"
                        @color-selected="handleColorStop"
                        @shade-selected="handleColorShade"
                    />
                </div>

                <HistoryBox :history="history" @edit="handleGradient" @remove="removeClasses" />
            </div>
        </div>
    </div>
</template>

<script>
import Lsdb from '@reliutg/lsdb'
import { Notify } from '@reliutg/buzz-notify/dist/esm/index'
import '@reliutg/buzz-notify/dist/buzz-notify.css'

import {
    copyToClipboard,
    addClassesToLocalStorage,
    debounce,
    getRandomInt,
    removeClassesFromLocalStorage,
    getNativeCssCode,
} from '../helpers'

import Hero from '../components/Hero.vue'
import DirectionController from '../components/DirectionController.vue'
import GradientSelector from '../components/GradientSelector.vue'
import HistoryBox from '../components/HistoryBox.vue'
import ClassOutput from '../components/ClassOutput.vue'
import ShareButton from '../components/ShareButton.vue'

export default {
    name: 'Home',
    components: { Hero, DirectionController, GradientSelector, HistoryBox, ClassOutput, ShareButton },
    data() {
        return {
            gradient: '',
            colors: [
                'none',
                'transparent',
                'current',
                'black',
                'white',
                'slate',
                'gray',
                'neutral',
                'stone',
                'red',
                'orange',
                'amber',
                'yellow',
                'lime',
                'green',
                'emerald',
                'teal',
                'cyan',
                'sky',
                'blue',
                'indigo',
                'violet',
                'purple',
                'fuchsia',
                'pink',
                'rose',
            ],
            stop: {
                from: {
                    color: 'green',
                    shade: 400,
                },
                via: {
                    color: 'cyan',
                    shade: 900,
                },
                to: {
                    color: 'blue',
                    shade: 500,
                },
            },
            direction: 'r',
            target: 'to',
            nativeCss: '',
            savedGradients: [],
            debouncedUpdate: undefined,
            database: null,
        }
    },
    computed: {
        classes() {
            return `bg-gradient-to-${this.direction} ${this.gradient}`
        },
        history() {
            return this.savedGradients
        },
    },
    watch: {
        stop: {
            handler() {
                let result = []
                let gradient = ''
                for (const key in this.stop) {
                    const element = this.stop[key]
                    if (element.color !== 'none' && !(key === 'to' && element.color === 'transparent')) {
                        gradient = `${key}-${element.color}`
                        if (!['transparent', 'current', 'black', 'white'].includes(element.color)) {
                            gradient += `-${element.shade}`
                        }
                        result.push(gradient)
                    }
                }
                this.gradient = result.join(' ')
                if (typeof this.debouncedUpdate === 'function') this.debouncedUpdate()
            },
            // watcher will look for changes as soon as this component is created
            immediate: true,
            deep: true,
        },
        direction: {
            handler() {
                if (typeof this.debouncedUpdate === 'function') this.debouncedUpdate()
            },
        },
    },
    beforeMount() {
        // assign the function to be debounced
        // the "this.updateRoute" function will update the URL after 1000ms any time the user changes the colors or direction
        this.debouncedUpdate = debounce(this.updateRoute, 1000)
    },
    mounted() {
        this.database = new Lsdb('tailwind-gradient-generator')
        this.database.collection(['gradients'])
        this.fetchSavedGradients()
        if (this.$route.name === 'gradient') {
            // direction should be either of the following:
            // "t", "tl", "tr", "b", "bl", "br", "l", "r" (uppercase and lowercase both are accepted)
            // if direction is not mentioned in the URL, then "r" as default
            const dir = this.$route.query.direction ? this.$route.query.direction.toLowerCase() : 'r'
            this.handleDirection(dir)
        }
    },
    updated() {
        this.nativeCss = getNativeCssCode(this.$refs.gradientContainer)
    },
    methods: {
        handleGradient({ from, via, to, direction }) {
            this.handleColorStop({ stop: 'from', color: from.color })
            this.handleColorShade({ stop: 'from', shade: from.shade })
            this.handleColorStop({ stop: 'via', color: via.color })
            this.handleColorShade({ stop: 'via', shade: via.shade })
            this.handleColorStop({ stop: 'to', color: to.color })
            this.handleColorShade({ stop: 'to', shade: to.shade })
            this.handleDirection(direction)
        },
        handleColorStop({ stop, color }) {
            this.target = stop
            this.stop[stop].color = color
        },
        handleColorShade({ stop, shade }) {
            this.stop[stop].shade = shade * 100
        },
        handleDirection(direction) {
            if (typeof direction === 'string') {
                this.direction = direction
            }
        },
        fetchSavedGradients() {
            this.savedGradients = this.database.all('gradients')
                ? this.database.all('gradients').map((item) => item.class)
                : []
        },
        copyClasses() {
            copyToClipboard(this.classes, () => {
                Notify({
                    title: 'Copied',
                    type: 'success',
                    position: 'top-center',
                    duration: 1500,
                    config: {
                        icons: {
                            success: '🎉',
                        },
                    },
                })
            })
            addClassesToLocalStorage(this.classes, this.database)
            if (!this.history.includes(this.classes)) {
                this.savedGradients.push(this.classes)
            }
        },
        copyCssCode() {
            copyToClipboard(this.nativeCss, () => {
                Notify({
                    title: 'Copied',
                    type: 'success',
                    position: 'top-center',
                    duration: 1500,
                    config: {
                        icons: {
                            success: '🎉',
                        },
                    },
                })
            })
            addClassesToLocalStorage(this.nativeCss, this.database)
            if (!this.history.includes(this.nativeCss)) {
                this.savedGradients.push(this.nativeCss)
            }
        },
        removeClasses(classes) {
            removeClassesFromLocalStorage(classes, this.database, () => {
                this.fetchSavedGradients()
                Notify({
                    title: 'Removed',
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
        },
        // function will update the URL based on the colors, shades and direction the user chooses
        updateRoute() {
            const oldColors = this.$route.query.colors
            const oldDirection = this.$route.query.direction ? this.$route.query.direction.toLowerCase() : ''
            const oldPath = `${oldColors}${oldDirection}`
            const newColors = `${this.stop.from.color}-${this.stop.from.shade},${this.stop.via.color}-${this.stop.via.shade},${this.stop.to.color}-${this.stop.to.shade}`
            const newDirection = this.direction.toLowerCase()
            const newPath = `${newColors}${newDirection}`
            // for avoiding the "NavigationDuplicated" error in vue-router, do not push to the route if the previous route was the same
            if (oldPath === newPath) return
            this.$router.push({
                name: 'gradient',
                query: {
                    colors: `${this.stop.from.color}-${this.stop.from.shade},${this.stop.via.color}-${this.stop.via.shade},${this.stop.to.color}-${this.stop.to.shade}`,
                    direction: this.direction.toUpperCase(),
                },
            })
        },
        generateRandomGradient() {
            const colorLength = this.colors.length - 1

            const fromIndex = getRandomInt(1, colorLength) // from 1 to skip "none"
            let color = this.colors[fromIndex]
            let shade = getRandomInt(1, 9)

            this.handleColorStop({ stop: 'from', color })
            this.handleColorShade({ stop: 'from', shade })

            const viaIndex = getRandomInt(1, colorLength) // from 1 to skip "none"
            color = this.colors[viaIndex]
            shade = getRandomInt(1, 9)

            this.handleColorStop({ stop: 'via', color })
            this.handleColorShade({ stop: 'via', shade })

            const toIndex = getRandomInt(2, colorLength) // from 2 to skip "none" and "transparent"
            color = this.colors[toIndex]
            shade = getRandomInt(1, 9)

            this.handleColorStop({ stop: 'to', color })
            this.handleColorShade({ stop: 'to', shade })

            const availableDirections = ['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br']
            const direction = availableDirections[getRandomInt(0, availableDirections.length - 1)]

            this.handleDirection(direction)
        },
    },
}
</script>

<style scoped>
.code-preview {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
