<template>
  <div class="input-group">
    <label v-if="label" :class="labelClass" class="mt-2">
      {{ label }}
    </label>
    <div class="media-body icon-state switch-outline p-l-10">
      <label class="switch">
        <input
          v-bind="$attrs"
          type="checkbox"
          :checked="modelValue"
          :required="required"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        <span :class="switchStyle"></span>
      </label>
    </div>
  </div>

  <div v-if="errors" class="invalid-feedback" style="display: inline">
    {{ errors[0] }}
  </div>
</template>

<script>
export default {
  name: 'BaseSwitchInput',
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
      type: Boolean,
      default: false,
    },
    required: {
      type: [Boolean],
      default: false,
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
    withChangeStyle: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    switchStyle() {
      return this.withChangeStyle
        ? `switch-state bg-${this.modelValue ? 'primary' : 'danger'}`
        : 'switch-state bg-primary';
    },
  },
};
</script>
