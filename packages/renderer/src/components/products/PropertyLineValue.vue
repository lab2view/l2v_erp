<template>
  <ul v-if="values.length" class="pl-0">
    <li v-for="val in values" :key="val" class="p-l-0">
      {{ val }}
    </li>
  </ul>
  <span v-else-if="isSwitcherField">
    {{ value === '1' ? 'true' : 'false' }}
  </span>
  <label
    v-else-if="isColorInputField"
    :style="`background: ${value};
    width: 25px;
    height: 25px;`"
  ></label>
  <div v-else>
    {{ value }}
  </div>
</template>

<script>
import PropertyMixin from '/@/mixins/PropertyMixin.js';

export default {
  mixins: [PropertyMixin],
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    values() {
      return this.isCheckboxField ? JSON.parse(this.value) : [];
    },
  },
};
</script>

<style scoped></style>
