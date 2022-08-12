<template>
  <div class="form-check" v-for="(option, index) in options" :key="index">
    <input
      class="form-check-input"
      type="checkbox"
      :checked="modelValue.includes(option[keyValue])"
      :id="`inline-${option[keyValue]}`"
      @change="handleChange($event, option[keyValue])"
    />
    <label class="form-check-label" :for="`inline-${option[keyValue]}`">
      {{ option[keyLabel] }}
    </label>
  </div>

  <div v-if="errors" class="invalid-feedback" style="display: inline">
    {{ errors[0] }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedOptions: [],
    };
  },
  props: {
    options: {
      type: Array,
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
      type: [Number, String, Array],
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
  mounted() {
    this.checkedOptions = JSON.parse(this.modelValue);
  },
  methods: {
    handleChange($event, value) {
      const isChecked = $event.target.checked;
      if (isChecked) {
        this.checkedOptions.push(value);
      } else {
        this.checkedOptions = this.checkedOptions.filter(
          (checkOption) => checkOption !== value
        );
      }
      this.checkedOptions = [...new Set(this.checkedOptions)];
      this.$emit('update:modelValue', this.checkedOptions);
    },
  },
};
</script>
