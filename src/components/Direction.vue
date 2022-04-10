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
    <div class="random-btn">
      <slot></slot>
    </div>
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
.random-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.direction-button,
.random-btn {
  --tw-bg-opacity: 0.25;
  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  fill: currentColor;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
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
  top: 0;
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
