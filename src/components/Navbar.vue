<template>
  <nav
    class="
      flex
      items-center
      justify-between
      flex-wrap
      md:flex-row md:flex-nowrap
      bg-white
      border-b border-gray-200
      p-4
      dark:bg-blueGray-900 dark:border-gray-700
    "
  >
    <h1 class="flex justify-center md:justify-start w-full">
      <svg
        class="h-8 w-8 mr-2 dark:text-white"
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
        />
      </svg>
      <router-link to="/">
        <span class="font-semibold text-xl tracking-tight dark:text-white">
          Tailwind Gradient Generator
        </span>
      </router-link>
    </h1>
    <ul class="flex items-center text-base justify-center w-full md:w-auto">
      <li>
        <router-link
          to="/presets"
          class="mr-5 hover:text-gray-900 dark:text-white"
        >
          Gradients
        </router-link>
      </li>
      <li>
        <a
          class="mr-5 hover:text-gray-900 dark:text-white"
          target="_blank"
          href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ftailwind-gradient-generator.vercel.app%2F&via=eliut505&text=Try%20it%2C%20you%20will%20love%20it&hashtags=TailwindGradientGenerator"
        >
          Twitter
        </a>
      </li>
      <li>
        <button class="flex" @click="toggleTheme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 hover:text-gray-900"
            viewBox="0 0 20 20"
            fill="currentColor"
            v-if="theme === 'light'"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 text-white hover:text-gray-200"
            viewBox="0 0 20 20"
            fill="currentColor"
            v-if="theme === 'dark'"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import Lsdb from "@reliutg/lsdb";

export default {
  name: "Navbar",
  data() {
    return {
      database: null,
    };
  },
  computed: {
    theme() {
      if (!this.database) {
        return null;
      }
      return this.database.all("theme")[0].theme;
    },
  },
  mounted() {
    this.database = new Lsdb("tailwind-gradient-generator");
    this.database.collection("theme");
    if (this.database.all("theme").length === 0) {
      this.database.insert("theme", { theme: "light" });
    }
    document
      .querySelector("html")
      .classList.toggle("dark", this.theme !== "light");
  },
  methods: {
    toggleTheme() {
      const THEMES = {
        light: "dark",
        dark: "light",
      };
      this.database.update(
        "theme",
        { theme: this.theme },
        { theme: THEMES[this.theme] }
      );
      document
        .querySelector("html")
        .classList.toggle("dark", this.theme !== "light");
    },
  },
};
</script>
