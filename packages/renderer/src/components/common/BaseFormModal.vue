<template>
  <div
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="tooltipmodal"
    style="display: block; padding-right: 15px"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
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
  name: 'BaseFormModal',
  props: {
    title: { type: String, required: true },
    submitForm: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped></style>
