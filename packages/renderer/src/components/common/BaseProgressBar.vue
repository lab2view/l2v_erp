<template>
  <div class="progress">
    <div
      v-bind="$attrs"
      class="progress-bar-animated bg-primary progress-bar-striped"
      role="progressbar"
      :style="`width: ${progress}%`"
      :aria-valuenow="value"
      :aria-valuemin="min"
      :aria-valuemax="max"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'BaseProgressBar',
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    progress() {
      return ((this.value * 100) / this.max).toFixed();
    },
  },
};
</script>

<style scoped></style>
