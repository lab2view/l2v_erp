<template>
  <BaseFormModal :title="title" :submit-form="submitProductFamilyForm">
    <div class="mb-3">
      <BaseInput
        v-model="productFamilyForm.label"
        class="form-control"
        type="text"
        :label="$t('common.attributes.label')"
        placeholder="Pagne, Smartphone, ..."
        required
        :errors="errors?.label"
      />
    </div>
    <div class="mb-3">
      <BaseTextArea
        :label="$t('common.attributes.description')"
        v-model="productFamilyForm.description"
        class="form-control"
        placeholder="Chaussures de marque"
        required
        :errors="errors?.description"
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
import BaseTextArea from '/@/components/common/BaseTextArea.vue';

export default {
  name: 'ProductFamilyForm',
  components: { BaseTextArea, BaseInput, BaseButton, BaseFormModal },
  data() {
    return {
      errors: [],
      loading: false,
      productFamilyForm: {
        id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('product_family', ['productFamily']),
    title() {
      return this.productFamily
        ? this.$t('products.productFamily.formUpdateTitle')
        : this.$t('products.productFamily.formCreateTitle');
    },
  },
  created() {
    if (this.productFamily) this.productFamilyForm = this.productFamily;
  },
  beforeUnmount() {
    if (this.productFamily)
      this.$store.commit('product_family/SET_CURRENT_PRODUCT_FAMILY', null);
  },
  methods: {
    submitProductFamilyForm() {
      this.loading = true;
      if (this.productFamily)
        this.$store
          .dispatch(
            'product_family/updateProductFamily',
            this.productFamilyForm
          )
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
      else
        this.$store
          .dispatch('product_family/addProductFamily', this.productFamilyForm)
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
