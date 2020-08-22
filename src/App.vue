<template>
  <div>
    <navbar-vue></navbar-vue>

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
            @click="copyToClipboard"
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
  </div>
</template>

<script>
import NavbarVue from "./components/Navbar.vue";
import DirectionVue from "./components/Direction.vue";
import GradientSelectorVue from "./components/GradientSelector.vue";

export default {
  name: "App",
  components: {
    NavbarVue,
    DirectionVue,
    GradientSelectorVue,
  },
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
    };
  },
  watch: {
    stop: {
      handler() {
        let result = [];
        let gradient = "";
        for (const key in this.stop) {
          if (this.stop.hasOwnProperty(key)) {
            const element = this.stop[key];
            if (element.color !== "none") {
              gradient = `${key}-${element.color}`;
              if (
                !["transparent", "current", "black", "white"].includes(
                  element.color
                )
              )
                gradient += `-${element.shade}`;
              result.push(gradient);
            }
          }
        }
        this.gradient = result.join(" ");
      },
      deep: true,
    },
  },
  methods: {
    handleColorStop({ stop, color }) {
      this.target = stop;
      this.stop[stop].color = color;
    },
    handleColorShade({ shade }) {
      this.stop[this.target].shade = shade * 100;
    },
    handleDirection(direction) {
      this.direction = direction;
    },
    copyToClipboard() {
      function selectElementText(element) {
        if (document.selection) {
          let range = document.body.createTextRange();
          range.moveToElementText(element);
          range.select();
        } else if (window.getSelection) {
          let range = document.createRange();
          range.selectNode(element);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
        }
      }
      let element = document.createElement("div");
      element.textContent = this.gradient;
      document.body.appendChild(element);
      selectElementText(element);
      document.execCommand("copy");
      element.remove();
      this.copied = true;
      setTimeout(() => (this.copied = false), 1500);
    },
  },
  computed: {
    classes() {
      return `bg-gradient-to-${this.direction} ${this.gradient}`;
    },
  },
};
</script>
