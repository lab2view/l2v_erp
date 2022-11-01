<template>
  <div v-if="showPercent" class="text-end">
    {{ `${progress} %` }}
  </div>
  <div class="progress" :style="styleProp">
    <div
      v-bind="$attrs"
      :class="progressClass"
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
    styleProp: {
      type: String,
      default: null,
    },
    progressClass: {
      type: String,
      default: 'progress-bar-animated bg-primary progress-bar-striped',
    },
    showPercent: {
      type: Boolean,
      default: false,
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
