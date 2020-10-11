<template>
  <div class="home">
    <template v-if="gradient">
      <div class="h-48" :class="classes"></div>
      <div class="text-center mt-5">
        <pre>
      <code class="whitespace-pre-line">
        {{classes}}
      </code>
      </pre>
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            @click="copyClasses"
            :disabled="copied"
          >
            {{ !copied ? "Copy to Clipboard" : "Copied" }}
          </button>
        </div>
      </div>
    </template>

    <direction-vue
      :direction="direction"
      @click="handleDirection"
    ></direction-vue>

    <div
      class="w-4/5 sm:w-3/4 md:w-1/2 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center m-auto my-5"
    >
      <gradient-selector-vue
        :title="'Starting color'"
        :colors="colors"
        :stop="'from'"
        :shade="stop['from'].shade"
        :target="target"
        @color-selected="handleColorStop"
        @shade-selected="handleColorShade"
      ></gradient-selector-vue>
      <gradient-selector-vue
        :title="'Middle color'"
        :colors="colors"
        :stop="'via'"
        :shade="stop['via'].shade"
        :target="target"
        @color-selected="handleColorStop"
        @shade-selected="handleColorShade"
      ></gradient-selector-vue>
      <gradient-selector-vue
        :title="'Ending color'"
        :colors="colors"
        :stop="'to'"
        :shade="stop['to'].shade"
        :target="target"
        @color-selected="handleColorStop"
        @shade-selected="handleColorShade"
      ></gradient-selector-vue>
    </div>
    <HistoryBox :history="history"/>
  </div>
</template>

<script>
import DirectionVue from "../components/Direction.vue";
import GradientSelectorVue from "../components/GradientSelector.vue";
import HistoryBox from "../components/HistoryBox.vue";
import { copyToClipboard, addClassesToLocalStorage, debounce } from "../helpers";

export default {
  name: "Home",
  components: { DirectionVue, GradientSelectorVue, HistoryBox },
  data: () => {
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
      savedGradients: JSON.parse(window.localStorage.getItem("savedGradients")) || [],
      debouncedUpdate: undefined
    };
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
      handler () {
        if (typeof this.debouncedUpdate === "function") this.debouncedUpdate()
      }
    }
  },
  beforeMount() {
    // assign the function to be debounced
    // the "this.updateRoute" function will update the URL after 1000ms any time the user changes the colors or direction
    this.debouncedUpdate = debounce(this.updateRoute, 1000);
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
        this.copied = true;
        setTimeout(() => (this.copied = false), 1500);
      });
      addClassesToLocalStorage(this.classes);
      !this.history.includes(this.classes) && this.savedGradients.push(this.classes);
    },
    // function will update the URL based on the colors, shades and direction the user chooses
    updateRoute () {
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
          direction: this.direction.toUpperCase()
        },
      })
    }
  },
  computed: {
    classes() {
      return `bg-gradient-to-${this.direction} ${this.gradient}`
    },
    history() {
      return this.savedGradients;
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
