<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-white p-6">
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
      <ul class="flex">
        <li>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=buzz-js&repo=tailwind-gradient-generator&type=star&count=true"
            frameborder="0"
            scrolling="0"
            width="150"
            height="20"
            title="GitHub"
          ></iframe>
        </li>
        <li>
          <a
            class="twitter-share-button"
            href="https://twitter.com/intent/tweet"
          >
            Tweet</a
          >
        </li>
      </ul>
    </nav>
    <div class="h-48" :class="gradient"></div>

    <div class="text-center mt-5">
      <pre>
      <code>
      {{gradient}}
      </code>
      </pre>
      <div>
        <button
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          @click="copyToClipboard"
          :disabled="copied"
        >
          {{ !copied ? "Copy to Clipboard" : "Copied" }}
        </button>
      </div>
    </div>
    <div class="w-1/2 p-2 flex justify-center m-auto my-5">
      <div
        class="grid grid-flow-row p-4 text-gray-500 bg-white rounded-lg shadow-lg fill-current"
        style="grid-template-columns: repeat(3, minmax(0, min-content));"
      >
        <button
          @click="handleDirection('tl')"
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
          @click="handleDirection('t')"
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
          @click="handleDirection('tr')"
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
          @click="handleDirection('l')"
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
          @click="handleDirection('r')"
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
          @click="handleDirection('bl')"
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
          @click="handleDirection('b')"
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
          @click="handleDirection('br')"
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

    <div class="w-1/2 p-2 flex justify-center m-auto my-5">
      <div class="shadow-md border border-white p-2 m-2 uppercase text-center">
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
      <div class="shadow-md border border-white p-2 m-2 uppercase text-center">
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
      <div class="shadow-md border border-white p-2 m-2 uppercase text-center">
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
      direction: "r",
      copied: false,
    };
  },
  methods: {
    handleColorStop(stop, color) {
      this[stop] = color;
    },
    handleShade(color, number) {
      console.log(color, number);
    },
    handleDirection(direction) {
      this.direction = direction;
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
    copyToClipboard() {
      function selectElementText(element) {
        if (document.selection) {
          let range = document.body.createTextRange();
          range.moveToElementText(element);
          range.select();
        } else if (window.getSelection) {
          let range = document.createRange();
          range.selectNode(element);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
        }
      }
      let element = document.createElement("div");
      element.textContent = this.gradient;
      document.body.appendChild(element);
      selectElementText(element);
      document.execCommand("copy");
      element.remove();
      this.copied = true;
      setTimeout(() => (this.copied = false), 1500);
    },
  },
  computed: {
    gradient() {
      let result = [`bg-gradient-to-${this.direction}`];
      if (this.from && this.from !== "none")
        result.push(`from-${this.from}-400`);
      if (this.via && this.via !== "none") result.push(`via-${this.via}-400`);
      if (this.to && this.to !== "none") result.push(`to-${this.to}-400`);
      return result.join(" ");
    },
  },
};
</script>
