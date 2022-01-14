<template>
  <BaseFormModal :title="title" :submit-form="submitProductFamilyForm">
    <div class="mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="productFamilyForm.label"
        class="form-control"
        type="text"
        placeholder="Chaussures, Bijoux, ..."
        required
      />
      <div v-if="errors.label" class="invalid-feedback" style="display: inline">
        {{ errors.label[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="description">{{
        $t('common.attributes.description')
      }}</label>
      <textarea
        id="description"
        v-model="productFamilyForm.description"
        class="form-control"
        placeholder="Chaussures de marque"
        required
      ></textarea>
      <div v-if="errors.description" class="invalid-feedback" style="display: inline">
        {{ errors.description[0] }}
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
      productFamilyForm: {
        id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('productFamilyConfig', ['productFamily']),
    title() {
      return this.productFamily
        ? this.$t('product.productFamily.formUpdateTitle')
        : this.$t('product.productFamily.formCreateTitle');
    },
  },
  created() {
    if (this.productFamily) this.productFamilyForm = this.productFamily;
  },
  beforeUnmount() {
    if (this.productFamily)
      this.$store.commit('productFamilyConfig/SET_CURRENT_PRODUCT_FAMILY', null);
  },
  methods: {
    submitProductFamilyForm() {
      if (this.productFamily)
        this.$store
          .dispatch('productFamilyConfig/updateProductFamily', this.productFamilyForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('productFamilyConfig/addProductFamily', this.productFamilyForm)
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
