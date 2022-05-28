<template>
  <button v-bind="$attrs">
    <i v-if="icon" :class="`${icon} ${iconClass}`" />
    <slot>
      {{ text }}
    </slot>
    <span
      v-if="loading"
      class="fa fa-spin fa-refresh"
      :class="text ? 'm-l-10' : ''"
    />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    iconClass: {
      type: String,
      default: 'm-r-10',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
