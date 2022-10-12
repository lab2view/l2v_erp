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
import BaseFormModal from '../../../../components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton, BaseFormModal },
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
