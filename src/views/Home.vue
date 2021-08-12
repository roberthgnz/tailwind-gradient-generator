<template>
  <div class="home">
    <div
      class="
        w-4/5
        sm:w-3/4
        md:w-1/2
        p-2
        grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        justify-center
        m-auto
        my-5
      "
    >
      <gradient-selector
        :title="'FROM'"
        :colors="colors"
        :stop="'from'"
        :shade="stop['from'].shade"
        :target="target"
        @color-selected="handleColorStop"
        @shade-selected="handleColorShade"
      ></gradient-selector>

      <gradient-selector
        :title="'VIA'"
        :colors="colors"
        :stop="'via'"
        :shade="stop['via'].shade"
        :target="target"
        @color-selected="handleColorStop"
        @shade-selected="handleColorShade"
      ></gradient-selector>

      <gradient-selector
        :title="'TO'"
        :colors="colors"
        :stop="'to'"
        :shade="stop['to'].shade"
        :target="target"
        @color-selected="handleColorStop"
        @shade-selected="handleColorShade"
      ></gradient-selector>
    </div>

    <template v-if="gradient">
      <div class="relative" style="height: 33.33vh" :class="classes">
        <div title="Copy code" class="code-preview cursor-pointer" @click="copyClasses">
          <svg
            v-if="!copied"
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path
              d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
            />
          </svg>
          <span v-else>🎉 copied</span>
        </div>
        <direction :direction="direction" @click="handleDirection"></direction>
      </div>
    </template>

    <HistoryBox :history="history" />
  </div>
</template>

<script>
import Direction from "../components/Direction.vue"
import GradientSelector from "../components/GradientSelector.vue"
import HistoryBox from "../components/HistoryBox.vue"
import { copyToClipboard, addClassesToLocalStorage, debounce } from "../helpers"

export default {
  name: "Home",
  components: { Direction, GradientSelector, HistoryBox },
  data() {
    return {
      gradient: "from-teal-400 to-blue-500",
      colors: [
        "none",
        "transparent",
        "current",
        "black",
        "white",
        "gray",
        "red",
        "yellow",
        "orange",
        "green",
        "teal",
        "blue",
        "indigo",
        "purple",
        "pink",
      ],
      stop: {
        from: {
          color: "red",
          shade: 100,
        },
        via: {
          color: "blue",
          shade: 900,
        },
        to: {
          color: "green",
          shade: 500,
        },
      },
      direction: "r",
      target: "",
      copied: false,
      savedGradients:
        JSON.parse(window.localStorage.getItem("savedGradients")) || [],
      debouncedUpdate: undefined,
    }
  },
  watch: {
    stop: {
      handler() {
        let result = []
        let gradient = ""
        for (const key in this.stop) {
          const element = this.stop[key]
          if (element.color !== "none") {
            gradient = `${key}-${element.color}`
            if (
              !["transparent", "current", "black", "white"].includes(
                element.color
              )
            )
              gradient += `-${element.shade}`
            result.push(gradient)
          }
        }
        this.gradient = result.join(" ")
        if (typeof this.debouncedUpdate === "function") this.debouncedUpdate()
      },
      // watcher will look for changes as soon as this component is created
      immediate: true,
      deep: true,
    },
    direction: {
      handler() {
        if (typeof this.debouncedUpdate === "function") this.debouncedUpdate()
      },
    },
  },
  beforeMount() {
    // assign the function to be debounced
    // the "this.updateRoute" function will update the URL after 1000ms any time the user changes the colors or direction
    this.debouncedUpdate = debounce(this.updateRoute, 1000)
  },
  methods: {
    handleColorStop({ stop, color }) {
      this.target = stop
      this.stop[stop].color = color
    },
    handleColorShade({ shade }) {
      this.stop[this.target].shade = shade * 100
    },
    handleDirection(direction) {
      if (typeof direction === "string") {
        this.direction = direction
      }
    },
    copyClasses() {
      copyToClipboard(this.classes, () => {
        this.copied = true
        setTimeout(() => (this.copied = false), 1500)
      })
      addClassesToLocalStorage(this.classes)
      !this.history.includes(this.classes) &&
        this.savedGradients.push(this.classes)
    },
    // function will update the URL based on the colors, shades and direction the user chooses
    updateRoute() {
      const oldColors = this.$route.query.colors
      const oldDirection = this.$route.query.direction
        ? this.$route.query.direction.toLowerCase()
        : ""
      const oldPath = `${oldColors}${oldDirection}`
      const newColors = `${this.stop.from.color}-${this.stop.from.shade},${this.stop.via.color}-${this.stop.via.shade},${this.stop.to.color}-${this.stop.to.shade}`
      const newDirection = this.direction.toLowerCase()
      const newPath = `${newColors}${newDirection}`
      // for avoiding the "NavigationDuplicated" error in vue-router, do not push to the route if the previous route was the same
      if (oldPath === newPath) return
      this.$router.push({
        name: "gradient",
        query: {
          colors: `${this.stop.from.color}-${this.stop.from.shade},${this.stop.via.color}-${this.stop.via.shade},${this.stop.to.color}-${this.stop.to.shade}`,
          direction: this.direction.toUpperCase(),
        },
      })
    },
  },
  computed: {
    classes() {
      return `bg-gradient-to-${this.direction} ${this.gradient}`
    },
    history() {
      return this.savedGradients
    },
  },
  mounted() {
    if (this.$route.name === "gradient") {
      // direction should be either of the following:
      // "t", "tl", "tr", "b", "bl", "br", "l", "r" (uppercase and lowercase both are accepted)
      // if direction is not mentioned in the URL, then "r" as default
      const dir = this.$route.query.direction
        ? this.$route.query.direction.toLowerCase()
        : "r"
      this.handleDirection(dir)
    }
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
