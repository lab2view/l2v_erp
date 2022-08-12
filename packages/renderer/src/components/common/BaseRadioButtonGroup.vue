<template>
  <div class="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="radio radio-primary"
    >
      <input
        :id="`inline-${index}`"
        type="radio"
        :name="name"
        :value="option[keyValue]"
        :checked="option[keyValue] === modelValue"
        @change="handleChange"
      />
      <label :for="`inline-${index}`">
        {{ option[keyLabel] }}
      </label>
    </div>
    <div v-if="errors" class="invalid-feedback" style="display: inline">
      {{ errors[0] }}
    </div>
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
    name: {
      type: String,
      required: true,
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
