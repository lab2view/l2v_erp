<template>
  <div
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="tooltipmodal"
    style="display: block; padding-right: 15px"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      :class="sizeClass"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="$router.back()"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    title: { type: String, required: true },
    modalSize: { type: String, default: null },
  },
  computed: {
    sizeClass() {
      return this.modalSize ? `modal-${this.modalSize}` : '';
    },
  },
};
</script>

<style scoped></style>
