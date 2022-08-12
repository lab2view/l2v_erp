import { propertyTypeCode } from '/@/helpers/codes.js';

export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },

  computed: {
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
    isColorInputField() {
      return (
        this.isInputField &&
        this.property.property_type.code === propertyTypeCode.color
      );
    },
  },
};
