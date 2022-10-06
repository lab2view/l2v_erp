<template>
  <BaseFormModal :submit-form="submitStockTypeForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="stockTypeForm.label"
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
        v-model="stockTypeForm.type_for"
        name="type_for"
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
        v-model="stockTypeForm.type_for"
        name="type_for"
        required
        type="radio"
        value="StockExit"
      />
      <label class="" for="stockExit">
        {{ $t('common.attributes.stock_exit') }}
      </label>

      <br />
      <div
        v-if="errors.type_for && errors.type_for.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.type_for[0] }}
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
  name: 'StockTypeForm',
  components: { BaseFormModal },
  data() {
    return {
      errors: [],
      formLoading: false,
      stockTypeForm: {
        id: null,
        label: null,
        type_for: null,
      },
    };
  },
  computed: {
    ...mapGetters('stock_type', ['stockType']),
    title() {
      return this.stockType && this.stockType.id
        ? this.$t('stocks.stockType.formUpdateTitle')
        : this.$t('stocks.stockType.formCreateTitle');
    },
  },
  created() {
    if (this.stockType && this.stockType.id)
      this.stockTypeForm = this.stockType;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.stockType && this.stockType.id)
      this.$store.commit('stock_type/SET_CURRENT_STOCK_TYPE', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitStockTypeForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.stockType && this.stockType.id) {
        this.$store
          .dispatch('stock_type/updateStockType', this.stockTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('stock_type/addStockType', this.stockTypeForm)
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
