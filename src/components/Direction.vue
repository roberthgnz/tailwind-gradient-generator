<template>
  <div class="direction h-full w-full">
    <button
      :class="[direction === 'tl' ? 'direction-button--active' : null]"
      class="direction-button tl"
      @click="$emit('click', 'tl')"
    >
      <Arrow class="transform rotate-135" />
    </button>
    <button
      :class="[direction === 't' ? 'direction-button--active' : null]"
      class="direction-button t"
      @click="$emit('click', 't')"
    >
      <Arrow class="transform rotate-180" />
    </button>
    <button
      :class="[direction === 'tr' ? 'direction-button--active' : null]"
      class="direction-button tr"
      @click="$emit('click', 'tr')"
    >
      <Arrow class="transform -rotate-135" />
    </button>
    <button
      :class="[direction === 'l' ? 'direction-button--active' : null]"
      class="direction-button l"
      @click="$emit('click', 'l')"
    >
      <Arrow class="transform -rotate-90" />
    </button>
    <div></div>
    <button
      :class="[direction === 'r' ? 'direction-button--active' : null]"
      class="direction-button r"
      @click="$emit('click', 'r')"
    >
      <Arrow class="transform rotate-90" />
    </button>
    <button
      :class="[direction === 'bl' ? 'direction-button--active' : null]"
      class="direction-button bl"
      @click="$emit('click', 'bl')"
    >
      <Arrow class="transform rotate-45" />
    </button>
    <button
      :class="[direction === 'b' ? 'direction-button--active' : null]"
      class="direction-button b"
      @click="$emit('click', 'b')"
    >
      <Arrow />
    </button>
    <button
      :class="[direction === 'br' ? 'direction-button--active' : null]"
      class="direction-button br"
      @click="$emit('click', 'br')"
    >
      <Arrow class="transform -rotate-45" />
    </button>
  </div>
</template>

<script>
import Arrow from "../icons/Arrow.vue";
export default {
  name: "Direction",
  props: {
    direction: {
      type: String,
      required: true,
    },
  },
  components: { Arrow },
};
</script>

<style scoped>
.direction-button {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  --tw-gradient-from: #38bdf8;
  --tw-gradient-stops: var(--tw-gradient-from),
    var(--tw-gradient-to, rgba(56, 189, 248, 0));
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
