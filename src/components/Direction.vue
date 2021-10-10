<template>
  <div class="direction h-full w-full">
    <button
      :class="[direction === 'tl' ? 'direction-button--active' : null]"
      class="direction-button tl"
      @click="$emit('click', 'tl')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="7" y1="7" x2="17" y2="17" />
        <polyline points="17 8 17 17 8 17" />
      </svg>
    </button>
    <button
      :class="[direction === 't' ? 'direction-button--active' : null]"
      class="direction-button t"
      @click="$emit('click', 't')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="18" y1="13" x2="12" y2="19" />
        <line x1="6" y1="13" x2="12" y2="19" />
      </svg>
    </button>
    <button
      :class="[direction === 'tr' ? 'direction-button--active' : null]"
      class="direction-button tr"
      @click="$emit('click', 'tr')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="17" y1="7" x2="7" y2="17" />
        <polyline points="16 17 7 17 7 8" />
      </svg>
    </button>
    <button
      :class="[direction === 'l' ? 'direction-button--active' : null]"
      class="direction-button l"
      @click="$emit('click', 'l')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="5" y1="12" x2="11" y2="18" />
        <line x1="5" y1="12" x2="11" y2="6" />
      </svg>
    </button>
    <div></div>
    <button
      :class="[direction === 'r' ? 'direction-button--active' : null]"
      class="direction-button r"
      @click="$emit('click', 'r')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="15" y1="16" x2="19" y2="12" />
        <line x1="15" y1="8" x2="19" y2="12" />
      </svg>
    </button>
    <button
      :class="[direction === 'bl' ? 'direction-button--active' : null]"
      class="direction-button bl"
      @click="$emit('click', 'bl')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="17" y1="7" x2="7" y2="17" />
        <polyline points="8 7 17 7 17 16" />
      </svg>
    </button>
    <button
      :class="[direction === 'b' ? 'direction-button--active' : null]"
      class="direction-button b"
      @click="$emit('click', 'b')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="16" y1="9" x2="12" y2="5" />
        <line x1="8" y1="9" x2="12" y2="5" />
      </svg>
    </button>
    <button
      :class="[direction === 'br' ? 'direction-button--active' : null]"
      class="direction-button br"
      @click="$emit('click', 'br')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="7" y1="7" x2="17" y2="17" />
        <polyline points="16 7 7 7 7 16" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Direction',
  props: {
    direction: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.direction-button {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  --tw-gradient-from: #38bdf8;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(56, 189, 248, 0));
  --tw-gradient-to: #2563eb;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e4e4e7;
  --tw-shadow: 0 0 transparent;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  font-family: inherit;
  font-size: 100%;
  text-transform: none;
  -webkit-appearance: button;
  background-image: none;
  cursor: pointer;
  line-height: inherit;
  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
  --tw-bg-opacity: 0.25;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  fill: currentColor;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
  --tw-text-opacity: 0.5;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
}
.direction-button:hover {
  --tw-text-opacity: 1;
  --tw-bg-opacity: 0.5;
}
.direction-button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.direction-button--active {
  --tw-text-opacity: 0.75;
  --tw-bg-opacity: 0.75;
}
.tl {
  position: absolute;
  top: 0;
  left: 0;
}
.t {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.tr {
  position: absolute;
  top: 0;
  right: 0;
}
.l {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.br {
  position: absolute;
  bottom: 0;
  right: 0;
}
.b {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.bl {
  position: absolute;
  bottom: 0;
  left: 0;
}
.r {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
