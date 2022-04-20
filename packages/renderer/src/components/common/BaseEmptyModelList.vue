<template>
  <span class="text-center">{{ label }}</span>
  <BaseButton
    type="button"
    class="btn btn-outline-primary"
    :icon="!loading ? icon : icon + 'fa-spin'"
    :text="'Refresh'"
    :loading="loading"
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
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    reloadPage() {
      window.location.reload();
      this.loading = true;
      setInterval(this.loadingStop, 5000);
    },
    loadingStop() {
      return (this.loading = false);
    },
  },
};
</script>

<style></style>
