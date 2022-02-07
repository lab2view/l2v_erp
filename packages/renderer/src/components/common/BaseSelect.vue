<template>
  <label v-if="label" :class="labelClass">
    {{ label }}
    <span v-if="required" class="text-danger m-l-5">*</span>
  </label>
  <select
    :required="required"
    :value="modelValue"
    class="form-control"
    v-bind="{
      ...$attrs,
      onChange: ($event) => {
        $emit('update:modelValue', $event.target.value);
      },
    }"
  >
    <option disabled selected value="">
      {{ $t('common.choose') }}
    </option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="keyValue ? option[keyValue] : option"
    >
      {{ keyLabel ? option[keyLabel] : option }}
    </option>
  </select>
  <div v-if="errors" class="invalid-feedback" style="display: inline">
    {{ errors[0] }}
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    labelClass: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [String, Number],
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
