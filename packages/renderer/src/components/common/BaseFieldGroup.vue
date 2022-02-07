<template>
  <label v-if="label" :class="labelClass">
    {{ label }}
    <span v-if="required" class="text-danger m-l-5">*</span>
  </label>
  <div class="input-group">
    <slot name="prepend"></slot>
    <slot v-bind="$attrs"></slot>
    <slot name="append">
      <button
        type="button"
        class="btn btn-iconsolid btn-success"
        :title="btnTitle"
        @click.prevent="$emit('btn-click')"
      >
        <i :class="btnIcon"></i>
      </button>
    </slot>
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
      default: null,
    },
    labelClass: {
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
    btnIcon: {
      type: String,
      default: 'fa fa-plus-square',
    },
    btnTitle: {
      type: String,
      default: null,
    },
  },
  emits: ['btn-click'],
};
</script>
