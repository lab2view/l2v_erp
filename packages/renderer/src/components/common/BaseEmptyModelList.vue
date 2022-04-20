<template>
  <span class="text-center">{{ label }}</span>
  <BaseButton
    type="button"
    class="btn btn-outline-primary"
    :icon="icon"
    :text="'Refresh'"
    @click="reloadPage"
  />
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
export default {
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
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style></style>
