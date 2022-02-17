<template>
  <button v-bind="$attrs">
    <i v-if="icon" :class="`${icon} m-r-10`" />
    <slot>
      {{ text }}
    </slot>
    <span v-if="loading" class="fa fa-spin fa-refresh m-l-10" />
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
