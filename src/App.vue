<template>
  <div>
    <navbar-vue></navbar-vue>

    <div class="h-48" :class="gradient"></div>

    <div class="text-center mt-5">
      <pre>
      <code class="whitespace-pre-line">
        {{stop}}
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
        :target="target"
        @click="handleColorStop"
      ></gradient-selector-vue>
      <gradient-selector-vue
        :title="'Middle color'"
        :colors="colors"
        :stop="'via'"
        :target="target"
        @click="handleColorStop"
      ></gradient-selector-vue>
      <gradient-selector-vue
        :title="'Ending color'"
        :colors="colors"
        :stop="'to'"
        :target="target"
        @click="handleColorStop"
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
        from: "red",
        to: "green",
        via: "blue",
      },
      direction: "r",
      target: '',
      copied: false,
    };
  },
  methods: {
    handleColorStop({ stop, color }) {
      this.target = stop;
      this.$set(this.stop, stop, color);
    },
    handleShade(color, number) {
      console.log(color, number);
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
    gradient() {
      let result = [`bg-gradient-to-${this.direction}`];
      let shade = 400;
      // // !["transparent", "current", "black", "white"].includes(color)
      // if (this.from && this.from !== "none")
      //   result.push(`from-${this.from}-${shade}`);
      // if (this.via && this.via !== "none")
      //   result.push(`via-${this.via}-${shade}`);
      // if (this.to && this.to !== "none") result.push(`to-${this.to}-${shade}`);
      return result.join(" ");
    },
  },
};
</script>
