<template>
  <BaseFormModal :title="title" :submit-form="submitProductUnitForm">
    <div class="mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="productUnitForm.label"
        class="form-control"
        type="text"
        placeholder="Litre, Kilo..."
        required
      />
      <div v-if="errors.label" class="invalid-feedback" style="display: inline">
        {{ errors.label[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="code">{{
        $t('common.attributes.code')
      }}</label>
      <input
        id="code"
        v-model="productUnitForm.code"
        class="form-control"
        type="text"
        placeholder="Kg, L..."
        required
      />
      <div v-if="errors.code" class="invalid-feedback" style="display: inline">
        {{ errors.code[0] }}
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
      productUnitForm: {
        id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('product_unit', ['productUnit']),
    title() {
      return this.productUnit
        ? this.$t('products.productUnit.formUpdateTitle')
        : this.$t('products.productUnit.formCreateTitle');
    },
  },
  created() {
    if (this.productUnit) this.productUnitForm = this.productUnit;
  },
  beforeUnmount() {
    if (this.productUnit)
      this.$store.commit('product_unit/SET_CURRENT_PRODUCT_UNIT', null);
  },
  methods: {
    submitProductUnitForm() {
      if (this.productUnit)
        this.$store
          .dispatch('product_unit/updateProductUnit', this.productUnitForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('product_unit/addProductUnit', this.productUnitForm)
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
