<template>
  <!-- page-wrapper Start-->
  <BaseFormModal
    title="Confirmer l'operation"
    :with-close-action="false"
    :submit-form="submitConfirmPinForm"
  >
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-text"><i class="icon-lock"></i></span>
        <BaseInput
          v-model="checkInput.cancel_pin"
          type="password"
          placeholder="*********"
          required
          @keydown.enter="submitConfirmPinForm"
        />
      </div>
      <span v-if="error" class="text-danger">{{ error }}</span>
    </div>
    <template #footer>
      <BaseButton
        :text="$t('common.cancel')"
        class="btn btn-secondary btn-block"
        @click.prevent="$emit('cancel')"
      />
      <BaseButton
        :text="$t('common.confirm')"
        :loading="loading"
        class="btn btn-primary btn-block"
        type="submit"
      />
    </template>
  </BaseFormModal>
  <!-- page-wrapper end-->
</template>
<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseFormModal from '/@/components/common/BaseFormModal.vue';

export default {
  components: { BaseFormModal, BaseButton, BaseInput },
  emits: ['unlocked', 'cancel'],
  data() {
    return {
      loading: false,
      error: null,
      checkInput: {
        cancel_pin: null,
      },
    };
  },
  methods: {
    submitConfirmPinForm() {
      if (this.loading) return;
      if (this.checkInput.cancel_pin) {
        this.loading = true;
        this.error = null;
        this.$store
          .dispatch('auth/checkConfirmPin', this.checkInput)
          .then((data) => {
            if (!data.unlock) this.error = this.$t('common.unlock_pin_error');
            else this.$emit('unlocked');
            this.loading = false;
          })
          .catch((error) => {
            if (error.response?.data?.errors)
              this.error = error.response.data.errors.cancel_pin[0];
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped></style>
