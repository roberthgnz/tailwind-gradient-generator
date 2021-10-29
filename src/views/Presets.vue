<template>
  <div class="p-4">
    <ul class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <li
        v-for="(preset, index) in presets"
        :key="index"
        class="rounded cursor-pointer shadow-md transition duration-100 ease-in"
      >
        <div
          class="
            preset
            rounded-t
            relative
            flex
            justify-center
            items-center
            h-48
          "
          :class="preset"
          @click="copypreset(preset)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
        <div class="flex flex-wrap justify-center -m-0.5">
          <span class="p-0.5">
            <button
              class="
                p-1.5
                rounded-lg
                text-gray-500
                dark:text-gray-400 dark:hover:text-gray-600
                hover:text-gray-900
                transition-colors
              "
            >
              <Arrow />
            </button>
          </span>
          <span class="p-0.5">
            <button
              class="
                p-1.5
                rounded-lg
                text-gray-500
                dark:text-gray-400 dark:hover:text-gray-600
                hover:text-gray-900
                transition-colors
              "
            >
              <Arrow class="transform rotate-180" />
            </button>
          </span>
          <span class="p-0.5">
            <button
              class="
                p-1.5
                rounded-lg
                text-gray-500
                dark:text-gray-400 dark:hover:text-gray-600
                hover:text-gray-900
                transition-colors
              "
            >
              <Arrow class="transform -rotate-90" />
            </button>
          </span>
          <span class="p-0.5">
            <button
              class="
                p-1.5
                rounded-lg
                text-gray-500
                dark:text-gray-400 dark:hover:text-gray-600
                hover:text-gray-900
                transition-colors
              "
            >
              <Arrow class="transform rotate-90" />
            </button>
          </span>
          <span class="p-0.5">
            <button
              class="
                p-1.5
                rounded-lg
                text-gray-500
                dark:text-gray-400 dark:hover:text-gray-600
                hover:text-gray-900
                transition-colors
              "
            >
              <Arrow class="transform -rotate-45" />
            </button>
          </span>
          <span class="p-0.5">
            <button
              class="
                p-1.5
                rounded-lg
                text-gray-500
                dark:text-gray-400 dark:hover:text-gray-600
                hover:text-gray-900
                transition-colors
              "
            >
              <Arrow class="transform rotate-45" />
            </button>
          </span>
          <span class="p-0.5">
            <button
              class="
                p-1.5
                rounded-lg
                text-gray-500
                dark:text-gray-400 dark:hover:text-gray-600
                hover:text-gray-900
                transition-colors
              "
            >
              <Arrow class="transform -rotate-135" />
            </button>
          </span>
          <span class="p-0.5">
            <button
              class="
                p-1.5
                rounded-lg
                text-gray-500
                dark:text-gray-400 dark:hover:text-gray-600
                hover:text-gray-900
                transition-colors
              "
            >
              <Arrow class="transform rotate-135" />
            </button>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { presets } from "../presets";
import { copyToClipboard } from "../helpers";
import Arrow from "../icons/Arrow.vue";

export default {
  name: "Presets",
  data() {
    return {
      presets: [],
      copied: null,
    };
  },
  mounted() {
    this.presets = presets;
  },
  methods: {
    copypreset(preset) {
      copyToClipboard(preset, () => {
        this.copied = preset;
        setTimeout(() => (this.copied = null), 1500);
      });
    },
  },
  components: { Arrow },
};
</script>

<style scoped>
.preset svg {
  position: absolute;
  top: 5%;
  left: 5%;
  opacity: 0;
  transition: all 0.3s ease;
}
.preset:hover svg {
  opacity: 1;
}
</style>
