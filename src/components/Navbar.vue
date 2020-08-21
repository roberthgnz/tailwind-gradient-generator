<template>
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
        <a class="twitter-share-button" href="https://twitter.com/intent/tweet">
          Tweet</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
