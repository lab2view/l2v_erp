<template>
  <label v-if="label" :class="labelClass">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    class="form-control"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    }
  },
  emits: ['update:modelValue']
}
</script>
