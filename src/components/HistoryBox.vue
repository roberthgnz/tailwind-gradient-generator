<template>
  <div class="w-3/4 md:w-9/12 rounded-xl border p-2 my-8 mx-auto relative dark:border-gray-700 dark:text-white"
    v-if="history.length > 0">
    <h2 class="text-gray-500 font-normal md:mb-4 text-center dark:text-white">SAVED GRADIENTS</h2>
    <span
      class="block text-gray-400 font-thin md:absolute md:top-0 md:right-0 p-3 text-center cursor-pointer dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
      @click="handleRemoveHistoryItems(history)">Remove all</span>
    <ul class="h-48 overflow-y-auto text-center">
      <li v-for="item in history" :key="item" title="Click to copy"
        class="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
        <div class="flex justify-center items-center">
          <code class="text-center md:text-left leading-7 pr-1 md:pr-2" @click="copyHistoryItem(item)">
                        {{ item }}
                    </code>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"
            @click="handleRemoveHistoryItems([item])">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { copyToClipboard } from '../helpers/index.js'
import { Notify } from '@reliutg/buzz-notify/dist/esm/index'
import '@reliutg/buzz-notify/dist/buzz-notify.css'

export default {
  name: 'HistoryBox',
  props: {
    history: {
      type: Array,
      required: false,
      default() {
        return []
      },
    },
  },
  methods: {
    copyHistoryItem(classes) {
      copyToClipboard(classes, () => {
        Notify({
          title: 'Copied',
          type: 'success',
          position: 'bottom-center',
          duration: 1500,
          config: {
            icons: {
              success: '🎉',
            },
          },
        })
      })
    },
    handleRemoveHistoryItems(classes) {
      this.$emit('remove-history-items', classes)
    },
  },
}
</script>
