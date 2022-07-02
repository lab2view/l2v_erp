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
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.stock_variety')
      }}</label>
      <br />
      <br />

      <input
        id="stockEntry"
        v-model="stockStateForm.state_for"
        name="state_for"
        required
        type="radio"
        value="StockEntry"
      />
      <label class="" for="stockEntry">
        {{ $t('common.attributes.stock_entry') }}
      </label>

      <br />
      <input
        id="stockExit"
        v-model="stockStateForm.state_for"
        name="state_for"
        required
        type="radio"
        value="StockExit"
      />
      <label class="" for="stockExit">
        {{ $t('common.attributes.stock_exit') }}
      </label>

      <br />
      <div
        v-if="errors.state_for && errors.state_for.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.state_for[0] }}
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
      formLoading: false,
      stockStateForm: {
        id: null,
        label: null,
        state_for: null,
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
  mounted() {
    console.log('stockStateForm.state_for');
    console.log(this.stockStateForm.state_for);
  },
  created() {
    if (this.stockState && this.stockState.id)
      this.stockStateForm = this.stockState;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.stockState && this.stockState.id)
      this.$store.commit('stock_state/SET_CURRENT_STOCK_STATE', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitStockStateForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.stockState && this.stockState.id) {
        this.$store
          .dispatch('stock_state/updateStockState', this.stockStateForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('stock_state/addStockState', this.stockStateForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
  },
};
</script>

<style scoped></style>
