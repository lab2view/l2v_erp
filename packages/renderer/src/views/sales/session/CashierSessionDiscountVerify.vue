<template>
  <BaseFormModal
    :title="$t('common.discount_code_verify')"
    :submit-form="checkDiscountValidity"
  >
    <div class="form-group mb-3">
      <BaseInput
        v-model="discountCode"
        :placeholder="$t('common.discount_code')"
        type="text"
        required
      />
    </div>
    <div v-if="errorMessage" class="alert p-2 text-center alert-danger">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="alert p-2 text-center alert-primary">
      {{ successMessage }}
    </div>
    <template #footer>
      <BaseButton
        :title="$t('common.verify')"
        class="btn btn-primary"
        type="submit"
        :text="$t('common.verify')"
        icon="fa fa-check"
        :loading="loading"
      />
    </template>
  </BaseFormModal>
</template>

<script>
import BaseInput from '/@/components/common/BaseInput.vue';
import { notify } from '/@/helpers/notify';
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'CashierSessionDiscountVerify',
  components: {
    BaseButton,
    BaseFormModal,
    BaseInput,
  },
  data() {
    return {
      discountCode: null,
      successMessage: null,
      errorMessage: null,
      loading: false,
    };
  },

  methods: {
    checkDiscountValidity() {
      this.loading = true;
      this.errorMessage = null;
      this.successMessage = null;
      this.$store
        .dispatch('discount_code/getDiscountCodeByCode', this.discountCode)
        .then((discountCode) => {
          if (discountCode?.is_active) {
            this.successMessage = this.$t('common.discount_valid_code');
            notify(this.successMessage, 'Ok');
          } else {
            this.errorMessage = this.$t('common.discount_invalid_code');
            notify(this.errorMessage, 'NOK', 'danger');
          }
        })
        .catch((error) => (this.errorMessage = error?.response?.data?.message))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
