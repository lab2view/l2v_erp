<template>
  <BaseFormModal :submit-form="submitStockStateForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="stockStateForm.label"
        class="form-control"
        placeholder="..."
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
      stockStateForm: {
        id: null,
        label: null,
      },
    };
  },
  computed: {
    ...mapGetters('stock_state', ['stockState']),
    title() {
      return this.stockState && this.stockState.id
        ? this.$t('stocks.stockState.formUpdateTitle')
        : this.$t('stocks.stockState.formCreateTitle');
    },
  },
  created() {
    if (this.stockState && this.stockState.id)
      this.stockStateForm = this.stockState;
  },
  beforeUnmount() {
    if (this.stockState && this.stockState.id)
      this.$store.commit('stock_state/SET_CURRENT_STOCK_STATE', null);
  },
  methods: {
    submitStockStateForm() {
      if (this.stockState && this.stockState.id)
        this.$store
          .dispatch('stock_state/updateStockState', this.stockStateForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('stock_state/addStockState', this.stockStateForm)
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
