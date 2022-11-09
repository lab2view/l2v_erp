<template>
  <BaseFormModal :submit-form="submitStockTypeForm" :title="title">
    <div class="p-l-10 p-r-5">
      <div class="mb-3">
        <BaseInput
          v-model="stockTypeForm.label"
          :label="$t('common.attributes.label')"
          type="text"
          placeholder="..."
          :errors="errors?.label"
          required
        />
      </div>
      <div v-if="canShowRadioSection" class="mb-3">
        <BaseRadioButtonGroup
          v-model="stockTypeForm.type_for"
          :errors="errors?.type_for"
          :label="$t('common.attributes.stock_variety')"
          :options="typeForList"
          key-label="label"
          key-value="value"
          name="type_for"
        />
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
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseRadioButtonGroup from '/@/components/common/BaseRadioButtonGroup.vue';
import { stockFor } from '/@/helpers/codes.js';

export default {
  name: 'StockTypeForm',
  components: { BaseRadioButtonGroup, BaseInput, BaseFormModal },
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
    typeForList() {
      return [
        {
          value: stockFor.entry,
          label: this.$t('common.attributes.stock_entry_type_id'),
        },
        {
          value: stockFor.exit,
          label: this.$t('common.attributes.stock_exit_type_id'),
        },
      ];
    },
    title() {
      return this.stockType && this.stockType.id
        ? this.$t('stocks.stockType.formUpdateTitle')
        : this.$t('stocks.stockType.formCreateTitle');
    },
    canShowRadioSection() {
      return this.stockType?.not_deletable
        ? false
        : !this.$route.query.type_for;
    },
  },
  created() {
    if (this.stockType && this.stockType.id)
      this.stockTypeForm = this.stockType;
    else this.stockTypeForm.type_for = this.$route.query.type_for ?? null;
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
