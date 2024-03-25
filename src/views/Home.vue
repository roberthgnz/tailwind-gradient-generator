<template>
    <div class="relative h-[var(--content-height)]">
        <div class="h-full grid md:grid-cols-2 container mx-auto px-4 xl:px-0 mb-32">
            <div class="h-full overflow-y-auto flex flex-col gap-4 p-4">
                <GradientSelector
                    stop="from"
                    :title="'Starting color'"
                    :colors="colors"
                    :color="stop.from.color"
                    :shade="stop.from.shade"
                    :target="target"
                    @color-selected="handleColorStop"
                    @shade-selected="handleColorShade"
                    @stop-position-changed="handleStopPosition"
                />
                <GradientSelector
                    stop="via"
                    :title="'Middle color'"
                    :colors="colors"
                    :color="stop.via.color"
                    :shade="stop.via.shade"
                    :target="target"
                    @color-selected="handleColorStop"
                    @shade-selected="handleColorShade"
                    @stop-position-changed="handleStopPosition"
                />
                <GradientSelector
                    stop="to"
                    :title="'Ending color'"
                    :colors="colors"
                    :color="stop.to.color"
                    :shade="stop.to.shade"
                    :target="target"
                    @color-selected="handleColorStop"
                    @shade-selected="handleColorShade"
                    @stop-position-changed="handleStopPosition"
                />

                <HistoryBox :history="history" @edit="handleGradient" @remove="removeClasses" />
            </div>
            <Background>
                <div class="space-y-4 w-full rounded">
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
                                    <path
                                        d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
                                    ></path>
                                </svg>
                            </button>
                        </DirectionController>
                    </div>
                    <div class="flex flex-col xl:flex-row flex-wrap items-center w-full justify-center gap-2">
                        <ClassOutput :value="classes" :direction="direction" @click="copyClasses" />
                        <ShareButton :direction="direction" :stop="stop" />
                    </div>
                </div>
            </Background>
        </div>
    </div>
</template>

<script>
import { decode } from 'js-base64'
import Lsdb from '@reliutg/lsdb'
import { Notify } from '@reliutg/buzz-notify/dist/esm/index'
import '@reliutg/buzz-notify/dist/buzz-notify.css'

import { copyToClipboard, addClassesToLocalStorage, getRandomInt, removeClassesFromLocalStorage } from '../helpers'

import DirectionController from '../components/DirectionController.vue'
import GradientSelector from '../components/GradientSelector.vue'
import HistoryBox from '../components/HistoryBox.vue'
import ClassOutput from '../components/ClassOutput.vue'
import ShareButton from '../components/ShareButton.vue'
import Background from '../components/Background.vue'

export default {
    name: 'Home',
    components: {
        DirectionController,
        GradientSelector,
        HistoryBox,
        ClassOutput,
        ShareButton,
        Background,
    },
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
                    position: 0,
                },
                via: {
                    color: 'cyan',
                    shade: 900,
                    position: 0,
                },
                to: {
                    color: 'blue',
                    shade: 500,
                    position: 0,
                },
            },
            direction: 'r',
            target: 'to',
            nativeCss: '',
            savedGradients: [],
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
                    const stopValue = this.stop[key]
                    if (stopValue.color !== 'none' && !(key === 'to' && stopValue.color === 'transparent')) {
                        gradient = `${key}-${stopValue.color}`
                        if (!['transparent', 'current', 'black', 'white'].includes(stopValue.color)) {
                            gradient += `-${stopValue.shade}`
                        }
                        if (stopValue.position) {
                            gradient += ` ${key}-${stopValue.position}`
                        }
                        result.push(gradient)
                    }
                }
                this.gradient = result.join(' ')
            },
            // watcher will look for changes as soon as this component is created
            immediate: true,
            deep: true,
        },
    },
    mounted() {
        this.database = new Lsdb('tailwind-gradient-generator')
        this.database.collection(['gradients'])
        this.fetchSavedGradients()
        if (this.$route.query.g) {
            const decoded = decode(this.$route.query.g)
            const { stop, direction } = JSON.parse(decoded)
            this.handleGradient({ ...stop, direction })
        }
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
        handleStopPosition({ stop, position }) {
            this.stop[stop].position = position.replace(`${stop}-`, '')
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
