<template>
  <span v-if="icon" :class="icon" />
  <span class="text-center">{{ label }}</span>
  <BaseButton
    v-if="withAction"
    type="button"
    class="btn btn-outline-info"
    :text="actionLabel"
    @click="$emit('click')"
  />
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
export default {
  name: 'BaseEmptyModelList',
  components: { BaseButton },

  props: {
    icon: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    withAction: {
      type: Boolean,
      default: false,
    },
    actionLabel: {
      type: String,
      default: 'refresh',
    },
  },
  emits: ['click'],
};
</script>

<style></style>
