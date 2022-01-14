<template>
  <BaseFormModal :title="title" :submit-form="submitProductTypeForm">
    <div class="mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="productTypeForm.label"
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
        v-model="productTypeForm.description"
        class="form-control"
        placeholder="Chaussures de marque"
        required
      ></textarea>
      <div v-if="errors.description" class="invalid-feedback" style="display: inline">
        {{ errors.description[0] }}
      </div>
    </div>
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
        <option value="0" disabled selected>{{ $t('common.choose')}}</option>
        <option v-for="(productFamily, index) in productFamilies" :key="index" :value="productFamily.id" >{{ productFamily.label }}</option>
      </select>
      <div v-if="errors.product_family_id" class="invalid-feedback" style="display: inline">
        {{ errors.product_family_id[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="min_stock">{{
        $t('common.attributes.min_stock')
      }}</label>
      <input
        id="min_stock"
        v-model="productTypeForm.min_stock"
        class="form-control"
        type="text"
        placeholder="20"
      />
      <div v-if="errors.min_stock" class="invalid-feedback" style="display: inline">
        {{ errors.min_stock[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="max_stock">{{
        $t('common.attributes.max_stock')
      }}</label>
      <input
        id="max_stock"
        v-model="productTypeForm.max_stock"
        class="form-control"
        type="text"
        placeholder="50"
      />
      <div v-if="errors.max_stock" class="invalid-feedback" style="display: inline">
        {{ errors.max_stock[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="critical_stock">{{
        $t('common.attributes.critical_stock')
      }}</label>
      <input
        id="critical_stock"
        v-model="productTypeForm.critical_stock"
        class="form-control"
        type="text"
        placeholder="15"
      />
      <div v-if="errors.critical_stock" class="invalid-feedback" style="display: inline">
        {{ errors.critical_stock[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="alert_stock">{{
        $t('common.attributes.alert_stock')
      }}</label>
      <input
        id="alert_stock"
        v-model="productTypeForm.alert_stock"
        class="form-control"
        type="text"
        placeholder="10"
      />
      <div v-if="errors.alert_stock" class="invalid-feedback" style="display: inline">
        {{ errors.alert_stock[0] }}
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
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('productFamilyConfig', ['productFamilies']),
    ...mapGetters('productTypeConfig', ['productType']),
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
