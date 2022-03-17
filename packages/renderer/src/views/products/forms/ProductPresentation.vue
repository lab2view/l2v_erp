<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitProductForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.</span
        >
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                v-model="product_family_id"
                :label="$t('common.attributes.product_family')"
                :options="productFamilies"
                key-label="label"
                key-value="id"
              />
            </div>
            <div class="col-md">
              <BaseSelect
                v-model="product_type_id"
                :label="$t('common.attributes.product_type')"
                :options="product_types"
                key-label="label"
                key-value="id"
                :errors="errors?.product_type_id"
                required
              />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseInput
                v-model="productForm.name"
                :label="$t('common.attributes.name')"
                type="text"
                placeholder="E.g. Tangui"
                :errors="errors?.name"
                required
              />
            </div>
            <div class="col-md">
              <div class="row align-items-center">
                <div class="col-md">
                  <BaseSelect
                    v-model="productForm.product_unit_id"
                    :label="$t('common.attributes.product_unit')"
                    :options="productUnits"
                    key-label="label"
                    key-value="id"
                    :errors="errors?.product_unit_id"
                    required
                  />
                </div>
                <div class="col-md">
                  <BaseInput
                    v-model="productForm.weight"
                    :label="$t('common.attributes.weight')"
                    type="number"
                    placeholder="E.g. 1.5"
                    rel="any"
                    :disabled="disableWeightField"
                    :errors="errors?.weight"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseInput
                v-model="productForm.reference"
                :label="$t('common.attributes.reference')"
                placeholder="E.g. PROD-20105-BWM..."
                rel="any"
                :errors="errors?.reference"
                required
              />
            </div>
            <div class="col-md">
              <BaseInputGroup
                v-model="productForm.code"
                :label="$t('common.attributes.barcode')"
                placeholder="E.g. 1234..."
                :errors="errors?.code"
                required
                :disabled="!type_barcode"
              >
                <button
                  type="button"
                  class="btn btn-info btn-iconsolid"
                  :title="type_barcode ? $t('common.scan') : $t('common.type')"
                  @click.prevent="type_barcode = !type_barcode"
                >
                  <i :class="`fa fa-${type_barcode ? 'barcode' : 'edit'}`"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-success btn-iconsolid"
                  :title="$t('common.shuffle')"
                  @click.prevent="generateBarCode"
                >
                  <i class="fa fa-random"></i>
                </button>
              </BaseInputGroup>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <p>{{ $t('common.attributes.stock_config') }}</p>
          <div class="row">
            <div class="col-3 d-flex">
              <label class="col-form-label form-label pe-2">
                {{ $t('common.attributes.min') }}</label
              >
              <BaseInput
                v-model="productForm.min_stock"
                required
                type="number"
                placeholder="E.g. 5"
                :errors="errors?.min_stock"
              />
            </div>
            <div class="col-3 d-flex">
              <label class="col-form-label form-label pe-2">
                {{ $t('common.attributes.max') }}
              </label>
              <BaseInput
                v-model="productForm.max_stock"
                type="number"
                placeholder="E.g. 10"
                :errors="errors?.max_stock"
              />
            </div>
            <div class="col-3 d-flex">
              <label class="col-form-label form-label pe-2">
                {{ $t('common.attributes.critical') }}</label
              >
              <BaseInput
                v-model="productForm.critical_stock"
                required
                type="number"
                placeholder="E.g. 1"
                :errors="errors?.critical_stock"
              />
            </div>
            <div class="col-3 d-flex">
              <label class="col-form-label form-label pe-2">
                {{ $t('common.attributes.alert') }}</label
              >
              <BaseInput
                v-model="productForm.alert_stock"
                required
                type="number"
                placeholder="E.g. 3"
                :errors="errors?.alert_stock"
              />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <div class="checkbox">
                <input
                  id="can-be-sell"
                  v-model="productForm.can_be_sell"
                  type="checkbox"
                />
                <label class="mb-0" for="can-be-sell">
                  {{ $t('common.attributes.can_be_sell') }}
                </label>
              </div>
            </div>
            <div class="col-md">
              <div class="checkbox">
                <input id="disabled_at" v-model="disabled_at" type="checkbox" />
                <label class="mb-0" for="disabled_at">
                  {{ $t('common.attributes.disabled_at') }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            :text="$t('common.cancel')"
            @click.prevent="$router.push({ name: 'products' })"
          />
          <BaseButton
            class="btn btn-primary col-auto"
            :text="$t('common.save')"
            icon="fa fa-save"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../../../store';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import BaseInputGroup from '../../../components/common/BaseInputGroup.vue';
import BaseButton from '../../../components/common/BaseButton.vue';
import ean from '/@/helpers/ean';

export default {
  components: { BaseButton, BaseInputGroup, BaseSelect, BaseInput },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('product_family/getProductFamiliesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('product_unit/getProductUnitsList', {
        page: 1,
        field: {},
      }),
      store.dispatch('product_type/getProductTypesList', {
        page: 1,
        field: {},
      }),
    ])
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
      type_barcode: false,
      product_family_id: null,
      product_type_id: null,
      disabled_at: false,
      is_edited: true,
      productForm: {
        product_unit_id: null,
        product_type_id: null,
        name: null,
        reference: null,
        code: null,
        description: null,
        image: null,
        weight: null,
        price: null,
        disabled_at: null,
        can_be_sell: true,
        min_stock: null,
        max_stock: null,
        critical_stock: null,
        alert_stock: null,
      },
    };
  },
  computed: {
    ...mapGetters('product', ['product']),
    ...mapGetters('product_family', ['productFamilies']),
    ...mapGetters('product_type', ['productTypes']),
    ...mapGetters('product_unit', ['productUnits']),
    product_types() {
      return this.product_family_id
        ? this.productTypes.filter(
            (t) =>
              t.product_family_id.toString() ===
              this.product_family_id.toString()
          )
        : this.productTypes;
    },
    formTitle() {
      return this.product
        ? this.$t('products.form.updateTitle')
        : this.$t('products.form.createTitle');
    },
    disableWeightField() {
      return this.productForm.product_unit_id === null;
    },
  },
  watch: {
    product_type_id(value) {
      const product_type = this.product_types.find(
        (pt) => pt.id.toString() === value.toString()
      );
      if (product_type !== undefined) {
        this.productForm.product_type_id = product_type.id;
        if (this.productForm.min_stock === null)
          this.productForm.min_stock = product_type.min_stock;
        if (this.productForm.max_stock === null)
          this.productForm.max_stock = product_type.max_stock;
        if (this.productForm.critical_stock === null)
          this.productForm.critical_stock = product_type.critical_stock;
        if (this.productForm.alert_stock === null)
          this.productForm.alert_stock = product_type.alert_stock;
      }
    },
    disabled_at(value) {
      this.productForm.disabled_at = value ? new Date() : null;
    },
    productForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.product) {
      this.productForm = this.product;
      this.product_family_id = this.product.product_type?.product_family_id;
      this.product_type_id = this.product.product_type_id;
      this.disabled_at = this.product.disabled_at !== null;
      this.is_edited = false;
    }
  },
  methods: {
    submitProductForm() {
      if (this.product) {
        if (this.is_edited)
          this.$store
            .dispatch('product/updateProduct', this.productForm)
            .then((product) =>
              this.$router.push({
                name: 'product.form.setting',
                params: { id: product.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            });
        else
          this.$router.push({
            name: 'product.form.setting',
            params: { id: this.product.id },
          });
      } else
        this.$store
          .dispatch('product/addProduct', this.productForm)
          .then((product) =>
            this.$router.push({
              name: 'product.form.setting',
              params: { id: product.id },
            })
          )
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
    },
    generateBarCode() {
      this.productForm.code = ean.generateEan13();
    },
  },
};
</script>

<style scoped></style>
