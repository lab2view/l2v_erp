<template>
  <BaseFormModal
    :title="$t('common.discount_code_verify')"
    :show-footer="false"
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
    <template #footer>
      <BaseButton
        :title="$t('common.verify')"
        class="btn btn-primary"
        type="submit"
        :text="$t('common.verify')"
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
      loading: false,
    };
  },

  methods: {
    checkDiscountValidity() {
      this.loading = true;
      this.$store
        .dispatch('discount_code/getDiscountCodeByCode', this.discountCode)
        .then((discountCode) => {
          if (discountCode?.is_active) notify('Code de reduction valide', 'Ok');
          else notify('Code de reduction invalid', 'Erreur', 'danger');
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
