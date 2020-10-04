<template>
  <div class="shadow-md my-8 border border-white max-w-2xl mx-auto py-4 px-2">
    <h2 class="text-gray-500 font-normal mb-4 text-center">
      SAVED GRADIENTS
    </h2>
    <ul class="h-48 overflow-y-auto">
      <li
        v-for="item in history"
        class="cursor-pointer leading-7 hover:text-gray-700"
        @click="copyHistoryItem(item)"
        :key="item"
      >
        <code class="text-left pr-2">{{ item }}</code>
        <span v-if="copied === item" class="text-right text-gray-400"
          >Copied🎉</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { copyToClipboard } from "../helpers/index.js"
export default {
  name: "HistoryBox",
  props: {
    history: {
      type: Array,
      required: false,
      default() {
        return []
      },
    },
  },
  data: () => {
    return {
      copied: null,
    }
  },
  methods: {
    copyHistoryItem(classes) {
      copyToClipboard(classes, () => {
        this.copied = classes
        setTimeout(() => (this.copied = null), 1500)
      })
    },
  },
}
</script>
