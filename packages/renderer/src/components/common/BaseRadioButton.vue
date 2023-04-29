<template>
  <div
    v-for="(option, index) in options"
    :key="index"
    class="form-check form-check-inline"
  >
    <input
      :id="`inline-${index}`"
      class="form-check-input"
      name="inlineRadioOptions"
      type="radio"
      :value="option.value"
      :checked="option.value === modelValue"
      @change="handleChange"
    />
    <label class="form-check-label" :for="`inline-${index}`">{{
      option.label
    }}</label>
  </div>
</template>

<script>
export default {
  name: 'BaseRadioButton',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    required: {
      type: [Boolean],
      default: false,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style scoped></style>
