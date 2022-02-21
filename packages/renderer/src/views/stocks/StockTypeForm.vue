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
        $t('common.attributes.stock_type')
      }}</label>
      <br />
      <br />

      <input
        id="stockEntry"
        v-model="stockTypeForm.type_for"
        name="type_for"
        required
        type="radio"
        value="stockEntry"
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
        value="stockExit"
      />
      <label class="" for="stockExit">
        {{ $t('common.attributes.stock_entry') }}
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
  components: { BaseFormModal },
  data() {
    return {
      errors: [],
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
    if (this.stockType && this.stockType.id)
      this.$store.commit('stock_type/SET_CURRENT_STOCK_TYPE', null);
  },
  methods: {
    submitStockTypeForm() {
      if (this.stockType && this.stockType.id)
        this.$store
          .dispatch('stock_type/updateStockType', this.stockTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('stock_type/addStockType', this.stockTypeForm)
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
