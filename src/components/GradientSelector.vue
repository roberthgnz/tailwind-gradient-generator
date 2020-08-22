<template>
  <div
    class="shadow-md border border-white p-2 m-2 uppercase text-center"
    style="height: fit-content;"
  >
    <h2 class="text-gray-500 font-normal mb-2">
      {{ title }}
    </h2>
    <p v-if="stop" class="mb-2 font-bold">{{ color }}</p>
    <ul class="grid grid-cols-5 gap-2">
      <li
        v-for="color in colors"
        :key="color"
        :title="color"
        style="justify-self: center"
        @click="handleColor({ stop, color })"
      >
        <div
          class="border flex rounded justify-center items-center w-8 h-8 cursor-pointer"
          :class="getBg(color, 400)"
        >
          {{ getAbbr(color) }}
        </div>
      </li>
    </ul>
    <template v-if="showShades">
      <h2 class="text-gray-500 font-normal my-2">SHADE: {{ shade }}</h2>
      <ul class="grid grid-cols-5 gap-2">
        <li
          v-for="n in 9"
          :key="n"
          @click="handleShade({ shade: n })"
          style="justify-self: center"
        >
          <div
            class="border rounded flex justify-center items-center w-8 h-8 cursor-pointer"
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
        this.target === this.stop &&
        !["none", "transparent", "current", "black", "white"].includes(
          this.color
        )
      );
    },
  },
  methods: {
    handleColor({ stop, color }) {
      this.color = color;
      this.$emit("color-selected", { stop, color });
    },
    handleShade({ shade }) {
      this.$emit("shade-selected", { shade });
    },
    getBg(color, shade) {
      return !["transparent", "current", "black", "white"].includes(color)
        ? `bg-${color}-${shade}`
        : `bg-${color}`;
    },
    getAbbr(color) {
      let colors = ["none", "transparent", "current", "black", "white"];
      let index = colors.findIndex((i) => i === color);
      return index !== -1 ? colors[index][0] : null;
    },
  },
};
</script>
