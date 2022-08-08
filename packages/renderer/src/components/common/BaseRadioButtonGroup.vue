<template>
  <div class="form-check-inline">
    <label
      v-for="(option, index) in options"
      :key="index"
      :for="`inline-${option[keyValue]}`"
      class="form-check-label m-l-5"
    >
      <input
        :id="`inline-${option[keyValue]}`"
        type="radio"
        name="radio-input"
        class="form-check-input"
        :checked="modelValue"
        :value="option[keyValue]"
        @change="$emit('update:modelValue', option[keyValue])"
      />
      {{ option[keyLabel] }}
    </label>
  </div>

  <div v-if="errors" class="invalid-feedback" style="display: inline">
    {{ errors[0] }}
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: 'form-label fw-bold',
    },
    modelValue: {
      type: [Number, String],
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    keyLabel: {
      type: String,
      default: null,
    },
    keyValue: {
      type: String,
      default: null,
    },
    required: {
      type: [Boolean],
      default: false,
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
  },
  emits: ['update:modelValue'],
};
</script>
