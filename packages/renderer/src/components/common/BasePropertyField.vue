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
    <BaseCheckbox
      v-else-if="isCheckboxField"
      v-model="propertyModelValue"
      :errors="errors?.[property.code]"
      :label="property.label"
      :options="property.property_values"
      key-label="value"
      key-value="value"
      required
    />
    <BaseRadioButtonGroup
      v-else-if="isRadioField"
      v-model="propertyModelValue"
      :errors="errors?.[property.code]"
      :label="property.label"
      :options="property.property_values"
      :name="property.code"
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
import BaseCheckbox from '/@/components/common/BaseCheckbox.vue';
import BaseRadioButtonGroup from '/@/components/common/BaseRadioButtonGroup.vue';

export default {
  components: {
    BaseRadioButtonGroup,
    BaseCheckbox,
    BaseSwitchInput,
    BaseSelect,
    BaseInput,
  },
  props: {
    property: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: [String, Number, Object, Array, Boolean],
      default: '',
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
  },
  emits: ['update:modelValue', 'change-multiple'],
  computed: {
    propertyModelValue: {
      get() {
        return this.isCheckboxField
          ? this.modelValue
            ? JSON.parse(this.modelValue)
            : []
          : this.isSwitcherField
          ? this.modelValue === '1'
          : this.modelValue;
      },
      set(value) {
        const haveValue = value.length !== 0;
        if (this.isCheckboxField) {
          this.$emit('change-multiple', haveValue);
        }
        this.$emit(
          'update:modelValue',
          this.isCheckboxField
            ? haveValue
              ? JSON.stringify(value)
              : null
            : this.isSwitcherField
            ? value
              ? '1'
              : '0'
            : value
        );
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
        !this.property.property_type.is_list &&
        this.property.property_type.code === propertyTypeCode.switcher
      );
    },
    isCheckboxField() {
      return (
        this.property.property_type.is_list &&
        this.property.property_type.code === propertyTypeCode.checkbox
      );
    },
    isRadioField() {
      return (
        this.property.property_type.is_list &&
        this.property.property_type.code === propertyTypeCode.radio
      );
    },
  },
};
</script>

<style scoped></style>
