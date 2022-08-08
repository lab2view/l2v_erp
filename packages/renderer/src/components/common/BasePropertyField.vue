<template>
  <div class="mb-1">
    <BaseInput
      v-if="isInputField"
      v-model="propertyModelValue"
      :errors="errors?.[property.code]"
      :label="property.label"
      required
      :type="property.property_type.code"
    />
    <BaseSelect
      v-else-if="isSelectField"
      v-model="propertyModelValue"
      :errors="errors?.[property.code]"
      :label="property.label"
      :options="property.property_values"
      key-label="value"
      key-value="value"
      required
    />
    <BaseSwitchInput
      v-else-if="isSwitcherField"
      v-model="propertyModelValue"
      :errors="errors?.[property.code]"
      :label="property.label"
    />
    <BaseCheckboxGroup
      v-else-if="isCheckboxField"
      v-model="propertyModelValue"
      :errors="errors?.[property.code]"
      :label="property.label"
      :options="property.property_values"
      key-label="value"
      key-value="value"
      required
    />
  </div>
</template>

<script>
import BaseInput from '/@/components/common/BaseInput.vue';
import { propertyTypeCode } from '/@/helpers/codes.js';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';
import BaseCheckboxGroup from '/@/components/common/BaseCheckboxGroup.vue';
export default {
  components: { BaseCheckboxGroup, BaseSwitchInput, BaseSelect, BaseInput },
  props: {
    property: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: [String, Number, Object, Array],
      default: '',
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    propertyModelValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
    isInputField() {
      return (
        !this.property.property_type.is_list &&
        this.property.property_type.code !== propertyTypeCode.switcher
      );
    },
    isSelectField() {
      return (
        this.property.property_type.is_list &&
        this.property.property_type.code === propertyTypeCode.select
      );
    },
    isSwitcherField() {
      return (
        this.property.property_type.is_list &&
        this.property.property_type.code === propertyTypeCode.switcher
      );
    },
    isCheckboxField() {
      return (
        this.property.property_type.is_list &&
        this.property.property_type.code === propertyTypeCode.checkbox
      );
    },
  },
};
</script>

<style scoped></style>
