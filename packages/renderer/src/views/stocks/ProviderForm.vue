<template>
  <BaseFormModal :submit-form="submitStockProviderForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="stockProviderForm.label"
        class="form-control"
        placeholder="Particular, Agency..."
        required
        type="text"
      />
      <div
        v-if="errors.label && errors.label.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.label[0] }}
      </div>
    </div>
    <template #footer>
      <button :title="$t('common.save')" class="btn btn-primary" type="submit">
        {{ $t('common.save') }}
      </button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';

export default {
  components: { BaseFormModal },
  data() {
    return {
      errors: [],
      stockProviderForm: {
        id: null,
        label: null,
      },
    };
  },
  computed: {
    ...mapGetters('stock_provider', ['stockProvider']),
    title() {
      return this.stockProvider && this.stockProvider.id
        ? this.$t('stocks.provider.formUpdateTitle')
        : this.$t('stocks.provider.formCreateTitle');
    },
  },
  created() {
    if (this.stockProvider && this.stockProvider.id)
      this.stockProviderForm = this.stockProvider;
  },
  beforeUnmount() {
    if (this.stockProvider && this.stockProvider.id)
      this.$store.commit('stock_provider/SET_CURRENT_STOCK_PROVIDER', null);
  },
  methods: {
    submitStockProviderForm() {
      if (this.stockProvider && this.stockProvider.id)
        this.$store
          .dispatch('stock_provider/updateStockProvider', this.stockProviderForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('stock_provider/addStockProvider', this.stockProviderForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
