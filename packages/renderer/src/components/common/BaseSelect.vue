<template>
  <label v-if="label" :class="labelClass">
    {{ label }}
    <span v-if="required" class="text-danger m-l-5">*</span>
  </label>
  <VSelect
    v-if="searchable"
    v-model="searchableValue"
    append-to-body
    class="form-control"
    :options="options"
    :placeholder="placeholder ?? $t('common.choose')"
  />
  <select
    v-else
    :required="required"
    :value="modelValue"
    class="form-control"
    v-bind="{
      ...$attrs,
      onChange: ($event) => {
        $emit(
          'update:modelValue',
          $event.target.value !== '' ? $event.target.value : null
        );
      },
    }"
  >
    <option v-if="!haveNullValue" :disabled="required" selected value="">
      {{ placeholder ?? $t('common.choose') }}
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
import VSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  components: { VSelect },
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
      type: [String, Number, Object],
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
    placeholder: {
      type: String,
      default: null,
    },
    required: {
      type: [Boolean],
      default: false,
    },
    searchable: {
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
    haveNullValue() {
      return this.options.length
        ? this.options[0][this.keyValue] === '' ||
            this.options[0][this.keyValue] === null
        : false;
    },
    searchableValue: {
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

<style scoped>
>>> {
  /* Font */
  --vs-font-size: 1rem;
  --vs-line-height: 1;

  /* Borders */
  --vs-border-width: 0px;
  --vs-border-radius: 0px;

  /* Component Controls: Clear, Open Indicator */
  --vs-controls-size: 0;

  /* Active State */
  --vs-dropdown-option--active-bg: #24695c;
  --vs-dropdown-option--active-color: #fff;
}
</style>
