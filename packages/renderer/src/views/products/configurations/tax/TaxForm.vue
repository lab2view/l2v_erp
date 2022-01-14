<template>
  <BaseFormModal :title="title" :submit-form="submitTaxForm">
    <div class="mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="taxForm.label"
        class="form-control"
        type="text"
        placeholder="TVA,..."
        required
      />
      <div v-if="errors.label" class="invalid-feedback" style="display: inline">
        {{ errors.label[0] }}
      </div>
    </div>
    <template #footer>
      <button class="btn btn-primary" type="submit" :title="$t('common.save')">
        {{ $t('common.save') }}
      </button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '../../../../components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';

export default {
  components: { BaseFormModal },
  data() {
    return {
      errors: [],
      taxForm: {
        id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('taxConfig', ['tax']),
    title() {
      return this.tax
        ? this.$t('product.tax.formUpdateTitle')
        : this.$t('product.tax.formCreateTitle');
    },
  },
  created() {
    if (this.tax) this.taxForm = this.tax;
  },
  beforeUnmount() {
    if (this.tax)
      this.$store.commit('taxConfig/SET_CURRENT_TAX', null);
  },
  methods: {
    submitTaxForm() {
      if (this.tax)
        this.$store
          .dispatch('taxConfig/updateTax', this.taxForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('taxConfig/addTax', this.taxForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
