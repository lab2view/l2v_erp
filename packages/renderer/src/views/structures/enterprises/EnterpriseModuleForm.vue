<template>
  <BaseFormModal :submit-form="submitProductFamilyForm" :title="title">
    <div class="mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="productFamilyForm.label"
        class="form-control"
        placeholder="Chaussures, Bijoux, ..."
        required
        type="text"
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
      <div
        v-if="errors.description"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.description[0] }}
      </div>
    </div>
    <template #footer>
      <BaseButton
        :text="$t('common.save')"
        :title="$t('common.save')"
        class="btn btn-primary"
        type="submit"
        :loading="loading"
      />
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton, BaseFormModal },
  data() {
    return {
      loading: false,
      errors: [],
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
      if (this.loading) return;

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
            console.log(error);
            this.loading = false;
          });
      else
        this.$store
          .dispatch('product_family/addProductFamily', this.productFamilyForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
            this.loading = false;
          });
    },
  },
};
</script>

<style scoped></style>
