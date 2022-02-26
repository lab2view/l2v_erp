<template>
  <BaseFormModal :submit-form="submitSaleForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="saleForm.label"
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

export default {
  components: { BaseFormModal },
  data() {
    return {
      formLoading: false,
      errors: [],
      saleForm: {
        label: null,
      },
    };
  },
  computed: {
    title() {
      // return this.sale && this.sale.id
      //   ? this.$t('sales.sale.formUpdateTitle')
      //   : this.$t('sales.sale.formCreateTitle');
      return this.$t('sales.sale.formCreateTitle');
    },
  },
  created() {
  },
  beforeUnmount() {
    this.setLoading();
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitSaleForm() {
    },
  },
};
</script>

<style scoped></style>
