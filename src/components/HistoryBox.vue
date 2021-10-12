<template>
  <div class="shadow my-8 border border-white max-w-2xl mx-auto py-4 px-2 dark:text-white">
    <h2 class="text-gray-500 font-normal mb-4 text-center dark:text-white">SAVED GRADIENTS</h2>
    <ul class="h-48 overflow-y-auto text-center">
      <li
        v-for="item in history"
        :key="item"
        class="cursor-pointer leading-7 hover:text-gray-700"
        @click="copyHistoryItem(item)"
      >
        <code class="text-left pr-2">{{ item }}</code>
      </li>
    </ul>
  </div>
</template>

<script>
import { copyToClipboard } from "../helpers/index.js";
import Notify from "@reliutg/buzz-notify";
import "@reliutg/buzz-notify/dist/buzz-notify.css";

export default {
  name: "HistoryBox",
  props: {
    history: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  methods: {
    copyHistoryItem(classes) {
      copyToClipboard(classes, () => {
        Notify({
          title: "Copied",
          type: "success",
          position: "bottom center",
          duration: 1500,
          config: {
            icons: {
              success: "🎉",
            },
          },
        });
      });
    },
  },
};
</script>
