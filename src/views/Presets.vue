<template>
  <div class="p-4">
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
    >
      <li
        class="cursor-pointer hover:shadow-lg transition duration-100 ease-in"
        v-for="(preset, index) in presets"
        :key="index"
        @click="copypreset(preset)"
      >
        <div
          class="preset relative flex justify-center items-center h-48 rounded"
          :class="preset"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-copy"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path
              d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
            />
          </svg>
          <span v-if="copied === preset" class="text-white">Copied 🎉</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { presets } from "../presets"
import { copyToClipboard } from "../helpers"

export default {
  name: "presets",
  data: () => {
    return {
      presets: [],
      copied: null,
    }
  },
  mounted() {
    this.presets = presets
  },
  methods: {
    copypreset(preset) {
      copyToClipboard(preset, () => {
        this.copied = preset
        setTimeout(() => (this.copied = null), 1500)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.preset {
  svg {
    position: absolute;
    top: 5%;
    left: 5%;
    opacity: 0;
    transition: all 0.3s ease;
  }
  &:hover svg {
    opacity: 1;
  }
}
</style>
