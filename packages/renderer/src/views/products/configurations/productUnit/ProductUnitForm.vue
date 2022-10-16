<template>
  <BaseFormModal :title="title" :submit-form="submitProductUnitForm">
    <div class="mb-3">
      <BaseInput
        v-model="productUnitForm.label"
        :label="$t('common.attributes.label')"
        type="text"
        placeholder="Litre, Kilo..."
        :errors="errors?.label"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="productUnitForm.code"
        :label="$t('common.attributes.code')"
        type="text"
        placeholder="Kg, L..."
        :errors="errors?.code"
        required
      />
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
import BaseInput from '/@/components/common/BaseInput.vue';

export default {
  name: 'ProductUnitForm',
  components: { BaseInput, BaseButton, BaseFormModal },
  data() {
    return {
      errors: [],
      loading: false,
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
      if (this.loading) return;

      this.loading = true;
      if (this.productUnit)
        this.$store
          .dispatch('product_unit/updateProductUnit', this.productUnitForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
      else
        this.$store
          .dispatch('product_unit/addProductUnit', this.productUnitForm)
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
