<template>
  <div class="form-group m-t-15 m-checkbox-inline mb-0">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="checkbox checkbox-dark"
    >
      <input
        :id="`inline-${index}`"
        type="checkbox"
        :value="option[keyValue]"
        :checked="inModelValues(option[keyValue])"
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
  name: 'BaseCheckbox',
  props: {
    options: {
      type: [Array, Object],
      required: true,
    },
    keyValue: {
      type: String,
      default: null,
    },
    keyLabel: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [Object, Array],
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
    handleChange(event) {
      if (event.target.checked)
        this.$emit('update:modelValue', [
          ...this.modelValue,
          event.target.value,
        ]);
      else
        this.$emit(
          'update:modelValue',
          this.modelValue.filter((v) => v !== event.target.value)
        );
    },
    inModelValues(value) {
      return this.modelValue ? this.modelValue.includes(value) : false;
    },
  },
};
</script>
