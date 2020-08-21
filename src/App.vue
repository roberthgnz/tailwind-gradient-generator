<template>
  <div>
    <navbar-vue></navbar-vue>

    <div class="h-48" :class="gradient"></div>

    <div class="text-center mt-5">
      <pre>
      <code>
      {{gradient}}
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

    <div class="w-1/2 p-2 flex justify-center m-auto my-5">
      <gradient-selector-vue
        :title="'Starting color'"
        :colors="colors"
        :stop="'from'"
        @click="handleColorStop"
      ></gradient-selector-vue>
      <gradient-selector-vue
        :title="'Middle color'"
        :colors="colors"
        :stop="'via'"
        @click="handleColorStop"
      ></gradient-selector-vue>
      <gradient-selector-vue
        :title="'Ending color'"
        :colors="colors"
        :stop="'to'"
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
      from: "red",
      to: "green",
      via: "blue",
      direction: "r",
      copied: false,
    };
  },
  methods: {
    handleColorStop({ stop, color }) {
      this[stop] = color;
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
      if (this.from && this.from !== "none")
        result.push(`from-${this.from}-400`);
      if (this.via && this.via !== "none") result.push(`via-${this.via}-400`);
      if (this.to && this.to !== "none") result.push(`to-${this.to}-400`);
      return result.join(" ");
    },
  },
};
</script>
