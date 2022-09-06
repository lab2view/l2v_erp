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
          <slot name="close">
            <button
              v-if="withCloseAction"
              class="btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.prevent="$router.back()"
            ></button>
          </slot>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    submitForm: {
      type: Function,
      required: true,
    },
    modalSize: { type: String, default: null },
    withCloseAction: { type: Boolean, default: true },
  },
  computed: {
    sizeClass() {
      return this.modalSize ? `modal-${this.modalSize}` : '';
    },
  },
};
</script>

<style scoped>
.modal-body {
  overflow-y: scroll;
  max-height: 32rem;
}
</style>
