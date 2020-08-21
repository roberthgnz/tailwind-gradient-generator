<template>
  <div>
    <nav class="flex items-center justify-center flex-wrap bg-white p-6">
      <div class="flex items-center flex-shrink-0 text-black mr-6">
        <svg
          class="fill-black h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
          />
        </svg>
        <span class="font-semibold text-xl tracking-tight"
          >Tailwind Gradient Generator</span
        >
      </div>
    </nav>
    <div class="h-48 bg-gradient-to-r" :class="gradient"></div>

    <div class="text-center mt-5">
      <span class="px-3 py-2 leading-none text-white bg-gray-800 rounded-md"
        >Classes</span
      >
      <pre>
      <code>
      {{gradient}}
      </code>
      </pre>
    </div>

    <div class="w-1/2 p-2 flex justify-center m-auto my-5">
      <div class="border border-gray-300 p-2 m-2 uppercase text-center">
        <h2 class="text-gray-500 font-normal mb-2">
          Starting color
        </h2>
        <p v-if="from" class="mb-2 font-bold">{{ from }}</p>
        <ul class="grid grid-cols-5 gap-2">
          <li
            v-for="color in colors"
            :key="color"
            @click="handleColorStop('from', color)"
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
      <div class="border border-gray-300 p-2 m-2 uppercase text-center">
        <h2 class="text-gray-500 font-normal mb-2">
          Middle color
        </h2>
        <p v-if="via" class="mb-2 font-bold">{{ via }}</p>
        <ul class="grid grid-cols-5 gap-2">
          <li
            v-for="color in colors"
            :key="color"
            @click="handleColorStop('via', color)"
          >
            <div
              class="border flex rounded justify-center items-center w-8 h-8 cursor-pointer"
              :class="getBg(color, 500)"
            >
              {{ getAbbr(color) }}
            </div>
          </li>
        </ul>
      </div>
      <div class="border border-gray-300 p-2 m-2 uppercase text-center">
        <h2 class="text-gray-500 font-normal mb-2">
          Ending color
        </h2>
        <p v-if="to" class="mb-2 font-bold">{{ to }}</p>
        <ul class="grid grid-cols-5 gap-2">
          <li
            v-for="color in colors"
            :key="color"
            @click="handleColorStop('to', color)"
          >
            <div
              class="border flex rounded justify-center items-center w-8 h-8 cursor-pointer"
              :class="getBg(color, 500)"
            >
              {{ getAbbr(color) }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    };
  },
  methods: {
    handleColorStop(stop, color) {
      this[stop] = color;
    },
    handleShade(color, number) {
      console.log(color, number);
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
  computed: {
    gradient() {
      let result = [];
      if (this.from && this.from !== "none")
        result.push(`from-${this.from}-400`);
      if (this.via && this.via !== "none") result.push(`via-${this.via}-400`);
      if (this.to && this.to !== "none") result.push(`to-${this.to}-400`);
      return result.join(" ");
    },
  },
};
</script>
