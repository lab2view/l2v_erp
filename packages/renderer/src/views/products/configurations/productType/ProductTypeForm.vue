<template>
  <BaseFormModal :title="title" :submit-form="submitProductTypeForm">
    <div class="mb-3">
      <label class="form-label fw-bold" for="product_family_id">{{
        $t('common.attributes.product_family')
      }}</label>
      <select
        id="product_family_id"
        v-model="productTypeForm.product_family_id"
        class="form-control"
        required
      >
        <option :value="null" disabled>{{ $t('common.choose') }}</option>
        <option
          v-for="productFamily in productFamilies"
          :key="productFamily.id"
          :value="productFamily.id"
        >
          {{ productFamily.label }}
        </option>
      </select>
      <div
        v-if="errors.product_family_id"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.product_family_id[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="productTypeForm.label"
        class="form-control"
        type="text"
        placeholder="Pagne, Bijoux, ..."
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
        v-model="productTypeForm.description"
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
    <div class="mb-3">
      <label class="form-label fw-bold" for="min_stock">{{
        $t('common.attributes.stock_config')
      }}</label>
      <div class="row">
        <div class="col-3">
          <label class="form-label fw-bold" for="min_stock">{{
            $t('common.attributes.min')
          }}</label>
          <input
            id="min_stock"
            v-model="productTypeForm.min_stock"
            class="form-control"
            type="text"
            placeholder="5"
          />
        </div>
        <div class="col-3">
          <label class="form-label fw-bold" for="max_stock">{{
            $t('common.attributes.max')
          }}</label>
          <input
            id="max_stock"
            v-model="productTypeForm.max_stock"
            class="form-control"
            type="text"
            placeholder="10"
          />
        </div>
        <div class="col-3">
          <label class="form-label fw-bold" for="critical_stock">{{
            $t('common.attributes.critical')
          }}</label>
          <input
            id="critical_stock"
            v-model="productTypeForm.critical_stock"
            class="form-control"
            type="text"
            placeholder="1"
          />
        </div>
        <div class="col-3">
          <label class="form-label fw-bold" for="alert_stock">{{
            $t('common.attributes.alert')
          }}</label>
          <input
            id="alert_stock"
            v-model="productTypeForm.alert_stock"
            class="form-control"
            type="text"
            placeholder="3"
          />
        </div>
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
import store from '../../../../store';

export default {
  components: { BaseFormModal },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('productFamilyConfig/getProductFamiliesList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  data() {
    return {
      errors: [],
      productTypeForm: {
        id: null,
        product_family_id: null,
        label: null,
        code: null,
        min_stock: 5,
        max_stock: 10,
        critical_stock: 1,
        alert_stock: 4,
      },
    };
  },
  computed: {
    ...mapGetters('productTypeConfig', ['productType']),
    ...mapGetters('productFamilyConfig', ['productFamilies']),
    title() {
      return this.productType
        ? this.$t('product.productType.formUpdateTitle')
        : this.$t('product.productType.formCreateTitle');
    },
  },
  created() {
    if (this.productType) this.productTypeForm = this.productType;
  },
  beforeUnmount() {
    if (this.productType)
      this.$store.commit('productTypeConfig/SET_CURRENT_PRODUCT_FAMILY', null);
  },
  methods: {
    submitProductTypeForm() {
      if (this.productType)
        this.$store
          .dispatch('productTypeConfig/updateProductType', this.productTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('productTypeConfig/addProductType', this.productTypeForm)
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
