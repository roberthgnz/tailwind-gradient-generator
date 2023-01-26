<template>
  <div class="p-4">
    <h1
      class="
        inline-block
        text-3xl
        font-extrabold
        text-gray-900
        dark:text-white
        tracking-tight
      "
    >
      Gradients
    </h1>
    <template v-for="(preset, index) in presets" :key="`preset-${index}`">
      <ul class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <li
          v-for="(gradient, index) in preset.gradients"
          :key="index"
          class="
            rounded
            cursor-pointer
            shadow-md
            transition
            duration-100
            ease-in
          "
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
            :class="gradient"
            @click="copypreset(gradient)"
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
            <span v-if="copied === gradient" class="text-white">Copied 🎉</span>
          </div>
        </li>
      </ul>
    </template>
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
