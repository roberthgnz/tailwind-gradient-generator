<template>
    <div
        class="rounded-xl w-full border bg-white dark:border-gray-700 dark:bg-gray-900 p-2 mx-auto uppercase text-center mb-3 md:mb-0"
        style="height: fit-content"
    >
        <h2 class="font-mono text-gray-900 font-bold mb-2 dark:text-white">
            {{ title }}
        </h2>
        <p v-if="stop" class="mb-2 font-bold dark:text-white">{{ color }}</p>
        <ul class="grid grid-cols-5 gap-1">
            <li
                v-for="item in colors"
                :key="item"
                :title="item"
                style="justify-self: center"
                :class="{
                    selected: item === color,
                }"
                @click="handleColor({ stop, color: item })"
            >
                <div
                    class="border dark:border-gray-700 flex rounded justify-center items-center w-9 h-9 cursor-pointer"
                    :class="getBg(item, 400)"
                >
                    {{ getAbbr(item) }}
                </div>
            </li>
        </ul>
        <transition name="animate">
            <gradient-shade-selector
                v-if="!noShadeAvailable.includes(color)"
                :color="color"
                :shade="shade"
                :selected-shade="selectedShade"
                @click="({ shade }) => $emit('shade-selected', { stop, shade })"
            ></gradient-shade-selector>
        </transition>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

const GradientShadeSelector = defineAsyncComponent(() => import('./GradientShadeSelector.vue'))

export default {
    name: 'GradientSelector',
    components: { GradientShadeSelector },
    emits: ['shade-selected', 'color-selected'],
    props: {
        title: {
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
    data: () => {
        return {
            color: null,
            noShadeAvailable: ['black', 'white', 'none', 'transparent'],
        }
    },
    computed: {
        selectedShade() {
            let minus = this.shade !== 500 ? 100 : 200
            return `bg-${this.color}-${900 - this.shade + minus}`
        },
    },
    mounted() {
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
            this.color = color.toLowerCase()
            this.handleColor({ stop: this.stop, color: this.color })
            // shade value is sent in single digits because the parent event "@shade-selected" multiplies it by 100
            this.handleShade({ stop: this.stop, shade: +shade / 100 || 5 })
        },
        handleColor({ stop, color }) {
            if (color !== 'current') {
                this.color = color
                this.$emit('color-selected', { stop, color })
            }
        },
        handleShade({ stop, shade }) {
            this.$emit('shade-selected', { stop, shade })
        },
        getBg(color, shade) {
            if (color === 'current') {
                return !['transparent', 'black', 'white'].includes(this.color)
                    ? `bg-${this.color}-${this.shade}`
                    : `bg-${this.color}`
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

.animate-enter-active {
    transition: all 0.5s ease;
}
.animate-leave-active {
    transition: 0.2s ease;
}
.animate-enter-from,
.animate-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
