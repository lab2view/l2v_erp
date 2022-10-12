<template>
  <label v-if="label" :class="labelClass">
    {{ label }}
    <span v-if="required" class="text-danger m-l-5">*</span>
  </label>
  <div class="input-group">
    <slot name="prefix" />
    <input
      v-bind="$attrs"
      :value="modelValue"
      :required="required"
      class="form-control"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <slot></slot>
  </div>
  <div v-if="errors" class="invalid-feedback" style="display: inline">
    {{ errors[0] }}
  </div>
</template>

<script>
export default {
  name: 'BaseInputGroup',
  props: {
    label: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, Object],
      default: '',
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
    required: {
      type: [Boolean],
      default: false,
    },
  },
  emits: ['update:modelValue'],
};
</script>
