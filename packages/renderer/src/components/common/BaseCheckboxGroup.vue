<template>
  <div class="input-group">
    <label v-if="label" :class="labelClass" class="mt-2">
      {{ label }}
    </label>
    <div class="form-group m-b-0 m-l-5 m-checkbox-inline font-primary">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="checkbox checkbox-primary"
        :class="
          modelValue
            ? modelValue === option[keyValue]
              ? 'checkbox-solid-success'
              : ''
            : ''
        "
      >
        <input
          :id="`inline-${option[keyValue]}`"
          type="checkbox"
          :checked="false"
          @click.prevent="setCheckbox(option[keyValue])"
        />
        <label :for="`inline-${option[keyValue]}`">{{
          option[keyLabel]
        }}</label>
      </div>
    </div>
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
  methods: {
    setCheckbox(id) {
      this.$emit('update:modelValue', id);
    },
  },
};
</script>
