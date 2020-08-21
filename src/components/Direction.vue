<template>
  <div class="w-1/2 p-2 flex justify-center m-auto my-5">
    <div
      class="grid grid-flow-row p-4 text-gray-500 bg-white rounded-lg shadow-lg fill-current"
      style="grid-template-columns: repeat(3, minmax(0, min-content));"
    >
      <button
        @click="$emit('click', 'tl')"
        :class="[direction === 'tl' ? 'text-gray-800 bg-gray-300' : null]"
        class="w-6 border border-transparent rounded focus:outline-none hover:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-up-left"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="7" y1="7" x2="17" y2="17" />
          <polyline points="16 7 7 7 7 16" />
        </svg>
      </button>
      <button
        @click="$emit('click', 't')"
        :class="[direction === 't' ? 'text-gray-800 bg-gray-300' : null]"
        class="w-6 border border-transparent rounded focus:outline-none hover:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-narrow-up"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="16" y1="9" x2="12" y2="5" />
          <line x1="8" y1="9" x2="12" y2="5" />
        </svg>
      </button>
      <button
        @click="$emit('click', 'tr')"
        :class="[direction === 'tr' ? 'text-gray-800 bg-gray-300' : null]"
        class="w-6 border border-transparent rounded focus:outline-none hover:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-up-right"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="17" y1="7" x2="7" y2="17" />
          <polyline points="8 7 17 7 17 16" />
        </svg>
      </button>
      <button
        @click="$emit('click', 'l')"
        :class="[direction === 'l' ? 'text-gray-800 bg-gray-300' : null]"
        class="w-6 border border-transparent rounded focus:outline-none hover:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-left"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="12" x2="11" y2="18" />
          <line x1="5" y1="12" x2="11" y2="6" />
        </svg>
      </button>
      <div></div>
      <button
        @click="$emit('click', 'r')"
        :class="[direction === 'r' ? 'text-gray-800 bg-gray-300' : null]"
        class="border border-transparent rounded focus:outline-none hover:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-right"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="13" y1="18" x2="19" y2="12" />
          <line x1="13" y1="6" x2="19" y2="12" />
        </svg>
      </button>
      <button
        @click="$emit('click', 'bl')"
        :class="[direction === 'bl' ? 'text-gray-800 bg-gray-300' : null]"
        class="w-6 border border-transparent rounded focus:outline-none hover:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-down-left"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="17" y1="7" x2="7" y2="17" />
          <polyline points="16 17 7 17 7 8" />
        </svg>
      </button>
      <button
        @click="$emit('click', 'b')"
        :class="[direction === 'b' ? 'text-gray-800 bg-gray-300' : null]"
        class="w-6 border border-transparent rounded focus:outline-none hover:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-down"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="18" y1="13" x2="12" y2="19" />
          <line x1="6" y1="13" x2="12" y2="19" />
        </svg>
      </button>
      <button
        @click="$emit('click', 'br')"
        :class="[direction === 'br' ? 'text-gray-800 bg-gray-300' : null]"
        class="w-6 border border-transparent rounded focus:outline-none hover:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-down-right"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="7" y1="7" x2="17" y2="17" />
          <polyline points="17 8 17 17 8 17" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Direction",
  props: {
    direction: {
      type: String,
      required: true,
    },
  },
};
</script>
