<template>
  <div
    class="rounded border dark:border-gray-700 p-2 m-2 uppercase text-center"
    style="height: fit-content"
  >
    <h2 class="font-mono text-gray-900 font-bold mb-2 dark:text-white">
      {{ title }}
    </h2>
    <p v-if="stop" class="mb-2 font-bold dark:text-white">{{ color }}</p>
    <ul class="grid grid-cols-5 gap-2">
      <li
        v-for="item in colors"
        :key="item"
        :title="item"
        style="justify-self: center"
        @click="handleColor({ stop, color: item })"
      >
        <div
          class="
            border
            dark:border-gray-700
            flex
            rounded
            justify-center
            items-center
            w-9
            h-9
            cursor-pointer
          "
          :class="getBg(item, 400)"
        >
          {{ getAbbr(item) }}
        </div>
      </li>
    </ul>
    <template v-if="showShades">
      <h2 class="text-gray-500 font-normal my-2 dark:text-white">
        SHADE: {{ shade }}
      </h2>
      <ul class="grid grid-cols-5 gap-2">
        <li
          v-for="n in 9"
          :key="n"
          style="justify-self: center"
          @click="handleShade({ shade: n })"
        >
          <div
            class="
              border
              dark:border-gray-700
              rounded
              flex
              justify-center
              items-center
              w-9
              h-9
              cursor-pointer
            "
            :class="`bg-${color}-${n}00`"
          >
            <div
              v-if="color && shade === Number(n * 100)"
              class="rounded-full h-4 w-4"
              :class="selectedShade"
            ></div>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: "GradientSelector",
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
    };
  },
  computed: {
    selectedShade() {
      let minus = this.shade !== 500 ? 100 : 200;
      return `bg-${this.color}-${900 - this.shade + minus}`;
    },
    showShades() {
      return (
        this.color &&
        this.target === this.stop &&
        !["none", "transparent", "current", "black", "white"].includes(
          this.color
        )
      );
    },
  },
  mounted() {
    // if the route name is 'gradient', that means the user has entered colors in the URL
    if (this.$route.name === "gradient") {
      const camelCaseColors = ["blueGray", "coolGray", "trueGray", "warmGray"];
      const [from, via, to] = this.$route.query.colors.split(",");
      let color = "none";
      let shade = 500;
      if (this.stop === "from") {
        [color, shade] = from ? from.split("-") : ["none", 500];
      }
      if (this.stop === "via") {
        [color, shade] = via ? via.split("-") : ["none", 500];
      }
      if (this.stop === "to") {
        [color, shade] = to ? to.split("-") : ["none", 500];
      }
      this.color = camelCaseColors.includes(color)
        ? color
        : color.toLowerCase();
      this.handleColor({ stop: this.stop, color: this.color });
      // shade value is sent in single digits because the parent event "@shade-selected" multiplies it by 100
      this.handleShade({ shade: +shade / 100 || 5 });
    }
  },
  methods: {
    handleColor({ stop, color }) {
      if (color !== "current") {
        this.color = color;
        this.$emit("color-selected", { stop, color });
      }
    },
    handleShade({ shade }) {
      this.$emit("shade-selected", { shade });
    },
    getBg(color, shade) {
      if (color === "current") {
        return !["transparent", "black", "white"].includes(this.color)
          ? `bg-${this.color}-${this.shade}`
          : `bg-${this.color}`;
      }
      return !["transparent", "black", "white"].includes(color)
        ? `bg-${color}-${shade}`
        : `bg-${color}`;
    },
    getAbbr(color) {
      const colors = {
        none: "n",
        transparent: "t",
        current: "c",
        black: "b",
        white: "w",
      };
      return colors[color] ?? null;
    },
  },
};
</script>
