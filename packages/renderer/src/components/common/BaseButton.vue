<template>
  <button v-bind="$attrs">
    <slot>
      <i v-if="icon" :class="`${icon} m-r-5`" />
      {{ text }}
    </slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: {
      type: String,
      default: 'Button',
    },
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped></style>
