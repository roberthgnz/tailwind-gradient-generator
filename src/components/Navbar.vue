<template>
  <nav
    class="
      flex
      items-center
      justify-between
      flex-wrap
      bg-white
      border-b border-gray-200
      p-4
    "
  >
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
      <router-link to="/"
        ><span class="font-semibold text-xl tracking-tight"
          >Tailwind Gradient Generator</span
        ></router-link
      >
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          to="/presets"
          class="
            block
            mt-4
            lg:inline-block
            lg:mt-0
            hover:text-gray-900
            text-gray-600
            font-medium
            mr-4
          "
        >
          Presets
        </router-link>
      </div>
      <ul class="flex justify-between items-center">
        <li>
          <a
            class="text-sm lg:flex-grow"
            target="_blank"
            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ftailwind-gradient-generator.vercel.app%2F&via=eliutgon&text=Try%20it%2C%20you%20will%20love%20it&hashtags=TailwindGradientGenerator"
          >
            Share on Twitter</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
}
</script>
