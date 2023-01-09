<template>
  <BaseFormModal :title="title" :submit-form="submitTaxForm">
    <div class="mb-3">
      <BaseInput
        v-model="taxForm.label"
        :label="$t('common.attributes.label')"
        type="text"
        placeholder="TVA,..."
        :errors="errors?.label"
        required
      />
    </div>
    <template #footer>
      <BaseButton
        class="btn btn-primary col-auto"
        :text="$t('common.save')"
        icon="fa fa-save"
        :loading="loading"
      />
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseInput from '/@/components/common/BaseInput.vue';

export default {
  name: 'TaxForm',
  components: { BaseInput, BaseButton, BaseFormModal },
  data() {
    return {
      errors: [],
      loading: false,
      taxForm: {
        id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('tax', ['tax']),
    title() {
      return this.tax
        ? this.$t('products.tax.formUpdateTitle')
        : this.$t('products.tax.formCreateTitle');
    },
  },
  created() {
    if (this.tax) this.taxForm = this.tax;
  },
  beforeUnmount() {
    if (this.tax) this.$store.commit('tax/SET_CURRENT_TAX', null);
  },
  methods: {
    submitTaxForm() {
      if (this.loading) return;

      this.loading = true;
      if (this.tax)
        this.$store
          .dispatch('tax/updateTax', this.taxForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
      else
        this.$store
          .dispatch('tax/addTax', this.taxForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
