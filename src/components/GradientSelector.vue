<template>
    <div class="rounded-lg w-full border bg-white dark:border-gray-700 dark:bg-gray-900 p-4 text-center space-y-4">
        <h3 class="text-gray-800 font-semibold dark:text-white text-lg">{{ title }} ({{ stop }})</h3>
        <div class="flex gap-8">
            <div class="space-y-2">
                <p v-if="stop" class="text-slate-400 font-normal dark:text-white uppercase text-sm">{{ selected }}</p>
                <ul class="grid grid-cols-5 gap-2 uppercase">
                    <li
                        v-for="item in colors"
                        :key="item"
                        :title="item"
                        style="justify-self: center"
                        :class="{
                            selected: item === selected,
                        }"
                        @click="handleColor({ stop, color: item })"
                    >
                        <div
                            class="dark:text-slate-50 flex rounded-md justify-center items-center size-7 max-w-9 max-h-9 cursor-pointer text-sm"
                            :class="getBg(item, 400)"
                        >
                            {{ getAbbr(item) }}
                        </div>
                    </li>
                </ul>
            </div>
            <GradientShadeSelector
                v-if="!noShadeAvailable.includes(selected)"
                :color="selected"
                :shade="shade"
                :selected-shade="selectedShade"
                @click="({ shade }) => $emit('shade-selected', { stop, shade })"
            />
            <StopPositionSelector
                :stop="stop"
                @update:model-value="(position) => $emit('stop-position-changed', { stop, position })"
            />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

const GradientShadeSelector = defineAsyncComponent(() => import('./GradientShadeSelector.vue'))
const StopPositionSelector = defineAsyncComponent(() => import('./StopPositionSelector.vue'))

export default {
    name: 'GradientSelector',
    components: { GradientShadeSelector, StopPositionSelector },
    props: {
        title: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        colors: {
            type: Array,
            required: true,
        },
        stop: {
            type: String,
            required: true,
        },
        shade: {
            type: Number,
            required: true,
        },
        target: {
            type: String,
            required: true,
        },
    },
    emits: ['shade-selected', 'color-selected', 'stop-position-changed'],
    data: () => {
        return {
            selected: 'none',
            noShadeAvailable: ['black', 'white', 'none', 'transparent'],
        }
    },
    computed: {
        selectedShade() {
            let minus = this.shade !== 500 ? 100 : 200
            return `bg-${this.selected}-${900 - this.shade + minus}`
        },
    },
    mounted() {
        this.selected = this.color

        if (this.$route.name === 'gradient') {
            this.initFromRoute()
        }
    },
    methods: {
        initFromRoute() {
            const [from, via, to] = this.$route.query.colors.split(',')
            let color = 'none'
            let shade = 500
            if (this.stop === 'from') {
                ;[color, shade] = from ? from.split('-') : ['none', 500]
            }
            if (this.stop === 'via') {
                ;[color, shade] = via ? via.split('-') : ['none', 500]
            }
            if (this.stop === 'to') {
                ;[color, shade] = to ? to.split('-') : ['none', 500]
            }
            this.selected = color.toLowerCase()
            this.handleColor({ stop: this.stop, color: this.selected })
            // shade value is sent in single digits because the parent event "@shade-selected" multiplies it by 100
            this.handleShade({ stop: this.stop, shade: +shade / 100 || 5 })
        },
        handleColor({ stop, color }) {
            if (color !== 'current') {
                this.selected = color
                this.$emit('color-selected', { stop, color })
            }
        },
        handleShade({ stop, shade }) {
            this.$emit('shade-selected', { stop, shade })
        },
        getBg(color, shade) {
            if (color === 'current') {
                return !['transparent', 'black', 'white'].includes(this.selected)
                    ? `bg-${this.selected}-${this.shade}`
                    : `bg-${this.selected}`
            }
            return !['transparent', 'black', 'white'].includes(color) ? `bg-${color}-${shade}` : `bg-${color}`
        },
        getAbbr(color) {
            const colors = {
                none: 'n',
                transparent: 't',
                current: 'c',
                black: 'b',
                white: 'w',
            }
            return colors[color] ?? null
        },
    },
}
</script>

<style scoped>
li.selected {
    position: relative;
}
li.selected::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background: #00000050;
}
</style>
