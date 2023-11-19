<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitProductForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >{{ $t('common.fields.required_field_start') }}
          <span class="text-danger">*</span>
          {{ $t('common.fields.required_field_end') }}
        </span>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseFieldGroup
                :with-refresh="true"
                :label="$t('common.attributes.product_family')"
                refresh-action-name="product_family/getProductFamiliesList"
                @btn-click="
                  $router.push({
                    name: 'Product.form.description.productFamily',
                    params: { ...$route.params },
                  })
                "
              >
                <BaseSelect
                  v-model.number="product_family_id"
                  :options="productFamilies"
                  key-label="label"
                  key-value="id"
                />
              </BaseFieldGroup>
            </div>
            <div class="col-md">
              <BaseFieldGroup
                :with-refresh="true"
                :label="$t('common.attributes.product_type')"
                required
                refresh-action-name="product_type/getProductTypesList"
                @btn-click="
                  $router.push({
                    name: 'Product.form.description.productType',
                    params: { ...$route.params },
                    query: { product_family_id },
                  })
                "
              >
                <BaseSelect
                  v-model.number="product_type_id"
                  :options="product_types"
                  key-label="label"
                  key-value="id"
                  :errors="errors?.product_type_id"
                  required
                />
              </BaseFieldGroup>
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
                  <BaseFieldGroup
                    :with-refresh="true"
                    :label="$t('common.attributes.product_unit')"
                    required
                    refresh-action-name="product_unit/getProductUnitsList"
                    @btn-click="
                      $router.push({
                        name: 'Product.form.description.productUnit',
                        params: { ...$route.params },
                      })
                    "
                  >
                    <BaseSelect
                      v-model.number="productForm.product_unit_id"
                      :options="productUnits"
                      key-label="label"
                      key-value="id"
                      :errors="errors?.product_unit_id"
                      required
                    />
                  </BaseFieldGroup>
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
          <div class="row align-items-center">
            <div class="col-md">
              <p class="f-w-600">
                {{ $t('common.attributes.stock_config') }}
              </p>
              <div class="row">
                <div class="row align-items-center">
                  <div class="col-6 d-flex">
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
                  <div class="col-6 d-flex">
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
                </div>
                <div class="row align-items-center mt-3">
                  <div class="col-6 d-flex">
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
                  <div class="col-6 d-flex">
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
            </div>
            <div class="col-md border p-2">
              <BaseFieldGroup
                :with-refresh="true"
                :with-append="false"
                refresh-action-name="enterprise/getEnterprisesList"
                :label="$t('common.fields.enterprise_visibility')"
                :errors="errors?.enterprise_ids"
              >
                <BaseSelect
                  v-model="enterprisesSelection"
                  :options="uniqueProductEnterprises"
                  key-label="name"
                  key-value="id"
                  :placeholder="$t('common.fields.select_structures')"
                />
              </BaseFieldGroup>
              <div class="mt-2">
                <div v-if="productEnterprises.length">
                  <p>
                    <span
                      v-for="(productEnt, ind) in productEnterprises"
                      :key="`ent-${ind}`"
                      class="badge badge-secondary"
                      @contextmenu.prevent="removeEnterprise(productEnt)"
                    >
                      {{ productEnt.name }}
                    </span>
                    <br />
                    <i class="text-warning f-w-500">
                      {{ $t('messages.right_click_to_delete') }}
                    </i>
                  </p>
                </div>
                <p v-else class="badge f-12 badge-primary">
                  {{ $t('messages.visible_by_all_structures') }}
                </p>
              </div>
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
            :loading="loading"
          />
        </div>
      </div>
    </form>

    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import ean from '/@/helpers/ean';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import { first } from 'lodash';

export default {
  name: 'ProductPresentation',
  components: {
    BaseFieldGroup,
    BaseButton,
    BaseInputGroup,
    BaseSelect,
    BaseInput,
  },
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
      productEnterprises: [],
      type_barcode: false,
      product_family_id: null,
      product_type_id: null,
      disabled_at: false,
      is_edited: true,
      loading: false,
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
    ...mapGetters('enterprise', ['enterprises']),
    product_types() {
      return this.product_family_id
        ? this.productTypes.filter(
            (t) => t.product_family_id === this.product_family_id
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
    uniqueProductEnterprises() {
      return this.enterprises
        .filter(
          (tent) =>
            this.productEnterprises.find((ent) => ent.id === tent.id) ===
            undefined
        )
        .map((ent) => {
          return {
            id: ent.id,
            name: ent.name,
          };
        });
    },
    enterprisesSelection: {
      get() {
        return null;
      },
      set(value) {
        const ent = this.uniqueProductEnterprises.find(
          (t) => t.id.toString() === value.toString()
        );
        if (ent !== undefined) {
          this.productEnterprises.push(ent);
        }
      },
    },
  },
  watch: {
    product_family_id(value) {
      if (value) {
        if (this.product_types.length > 0)
          this.product_type_id = first(this.product_types).id;
        else this.product_type_id = null;
      }
    },
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
      } else this.productForm.product_type_id = null;
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
    productEnterprises: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.product) {
      this.productForm = {
        id: this.product.id,
        product_unit_id: this.product.product_unit_id,
        product_type_id: this.product.product_type_id,
        name: this.product.name,
        reference: this.product.reference,
        code: this.product.code,
        description: this.product.description,
        image: this.product.image,
        weight: this.product.weight,
        price: this.product.price,
        disabled_at: this.product.disabled_at,
        can_be_sell: this.product.can_be_sell,
        min_stock: this.product.min_stock,
        max_stock: this.product.max_stock,
        critical_stock: this.product.critical_stock,
        alert_stock: this.product.alert_stock,
      };
      if (this.product?.enterprises.length) {
        this.productEnterprises = this.product.enterprises.map((ent) => {
          return {
            id: ent.id,
            name: ent.name,
          };
        });
      }
      this.product_family_id = this.product.product_type?.product_family_id;
      this.product_type_id = this.product.product_type_id;
      this.disabled_at = this.product.disabled_at !== null;
      this.is_edited = false;
    } else {
      if (this.productFamilies.length)
        this.product_family_id = first(this.productFamilies).id;
      if (this.product_types.length)
        this.product_type_id = first(this.product_types).id;
      if (this.productUnits.length)
        this.productForm.product_unit_id = first(this.productUnits).id;
    }
  },
  methods: {
    submitProductForm() {
      if (this.loading) return;

      this.loading = true;
      if (this.product) {
        if (this.is_edited)
          this.$store
            .dispatch('product/updateProduct', {
              ...this.productForm,
              enterprise_ids: this.productEnterprises.map((ent) => ent.id),
            })
            .then((product) =>
              this.$router.push({
                name: 'product.form.setting',
                params: { id: product.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
              this.loading = false;
            });
        else
          this.$router.push({
            name: 'product.form.setting',
            params: { id: this.product.id },
          });
      } else
        this.$store
          .dispatch('product/addProduct', {
            ...this.productForm,
            enterprise_ids: this.productEnterprises.map((ent) => ent.id),
          })
          .then((product) =>
            this.$router.push({
              name: 'product.form.setting',
              params: { id: product.id },
            })
          )
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
            this.loading = false;
          });
    },
    removeEnterprise(productEnt) {
      this.productEnterprises = this.productEnterprises.filter(
        (ent) => ent.id !== productEnt.id
      );
    },
    generateBarCode() {
      this.productForm.code = ean.generateEan13();
    },
  },
};
</script>

<style scoped></style>
