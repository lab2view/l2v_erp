<template>
  <label v-if="label" :class="labelClass">
    {{ label }}
    <span v-if="required" class="text-danger m-l-5">*</span>
  </label>
  <Datepicker
    v-bind="$attrs"
    v-model="value"
    :auto-apply="autoApply"
    :enable-time-picker="enableTimePicker"
    :min-date="minDate"
  />
  <div v-if="errors" class="invalid-feedback" style="display: inline">
    {{ errors[0] }}
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'BaseDatetime',
  components: { Datepicker },
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'date',
    },
    labelClass: {
      type: String,
      default: 'form-label fw-bold',
    },
    modelValue: {
      type: [String, Number, Object],
      default: '',
    },
    minDate: {
      type: String,
      default: '',
    },
    required: {
      type: [Boolean],
      default: false,
    },
    autoApply: {
      type: [Boolean],
      default: true,
    },
    enableTimePicker: {
      type: [Boolean],
      default: false,
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
