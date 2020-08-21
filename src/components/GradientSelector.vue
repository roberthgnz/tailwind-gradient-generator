<template>
  <div class="shadow-md border border-white p-2 m-2 uppercase text-center">
    <h2 class="text-gray-500 font-normal mb-2">
      {{ title }}
    </h2>
    <p v-if="stop" class="mb-2 font-bold">{{ stop }}</p>
    <ul class="grid grid-cols-5 gap-2">
      <li
        v-for="color in colors"
        :key="color"
        @click="$emit('click', { stop, color })"
      >
        <div
          class="border flex rounded justify-center items-center w-8 h-8 cursor-pointer"
          :class="getBg(color, 400)"
        >
          {{ getAbbr(color) }}
        </div>
      </li>
    </ul>
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
  },
  methods: {
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
