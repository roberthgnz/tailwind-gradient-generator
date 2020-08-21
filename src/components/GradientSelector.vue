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
    <template v-if="target === stop">
      <h2 class="text-gray-500 font-normal my-2">
        SHADE
      </h2>
      <ul class="grid grid-cols-5 gap-2">
        <li v-for="n in 9" :key="n" style="justify-self: center">
          <div
            class="border flex rounded justify-center items-center w-8 h-8 cursor-pointer"
            :class="`bg-${color}-${n}00`"
          ></div>
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
  methods: {
    handleColor({ stop, color }) {
      this.color = color;
      this.$emit("click", { stop, color });
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
