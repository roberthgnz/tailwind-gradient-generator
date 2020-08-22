<template>
  <div class="p-4">
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
    >
      <li
        class="cursor-pointer hover:shadow-lg transition duration-100 ease-in"
        v-for="(presset, index) in pressets"
        :key="index"
      >
        <div
          class="flex justify-center items-center h-48 rounded"
          :class="presset"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { pressets } from "../pressets";

export default {
  name: "Pressets",
  data: () => {
    return {
      pressets: [],
    };
  },
  mounted() {
    this.pressets = pressets;
  },
};
</script>
