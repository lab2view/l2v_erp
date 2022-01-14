<template>
  <label v-if="label" :class="labelClass">{{ label }}</label>
  <select
    class="field"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: ($event) => { $emit('update:modelValue', $event.target.value) }
    }"
  >
    <option
      v-for="option in options"
      :key="option"
      :value="option"
      :selected="option === event.category"
    >{{ option }}</option>
  </select>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    labelClass: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>
