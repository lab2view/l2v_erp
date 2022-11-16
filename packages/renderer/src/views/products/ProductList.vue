<template>
  <BaseContainer
    :title="$t('products.title')"
    :module="$t('menu.modules.products')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('products.listTitle')"
        add-action-router-name="product.form.desc"
        :refresh-action-field="{ page: 1, field: { paginate: 50, next: true } }"
        refresh-action-name="product/getProductsList"
      />
      <div class="card-body p-1">
        <div class="row mb-2">
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="product_family/getProductFamiliesList"
              :with-append="false"
            >
              <BaseSelect
                v-model.number="productFilter.product_family_id"
                :placeholder="`${$t('common.attributes.product_family')} ?`"
                :options="productFamilies"
                key-label="label"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="product_type/getProductTypesList"
              :with-append="false"
            >
              <BaseSelect
                v-model.number="productFilter.product_type_id"
                :placeholder="`${$t('common.attributes.product_type')} ?`"
                :options="filterProductTypes"
                key-label="label"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="product_unit/getProductUnitsList"
              :with-append="false"
            >
              <BaseSelect
                v-model.number="productFilter.product_unit_id"
                :placeholder="`${$t('common.attributes.product_unit')} ?`"
                :options="productUnits"
                key-label="label"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
        </div>
        <div v-if="filterableProperties.length" class="row mb-2">
          <div
            v-for="property in filterableProperties"
            :key="`p-filter-${property.id}`"
            class="col-md"
          >
            <BaseFieldGroup :with-refresh="false" :with-append="false">
              <BaseSelect
                v-model.number="productFilter.properties[property.id]"
                :placeholder="`${property.label} ?`"
                :options="property.property_values"
                key-label="value"
                key-value="value"
              />
            </BaseFieldGroup>
          </div>
        </div>

        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="products.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.type') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.barcode') }}</th>
            <th>{{ $t('common.attributes.state') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.product_type.label }}</td>
            <td>{{ product.name }}</td>
            <td>{{ `${product.code} / ${product.reference}` }}</td>
            <td>
              <span
                :class="`badge text-white badge-${
                  product.can_be_sell ? 'dark' : 'info'
                }`"
              >
                {{
                  product.can_be_sell
                    ? $t('common.states.can_be_sell')
                    : `${$t('common.states.no')} ${$t(
                        'common.states.can_be_sell'
                      )}`
                }}
              </span>
              <span
                :class="`badge text-white badge-${
                  product.disabled_at ? 'danger' : 'primary'
                }`"
              >
                {{
                  product.disabled_at
                    ? $t('common.states.disabled')
                    : $t('common.states.enabled')
                }}
              </span>
            </td>
            <td>
              <BaseButton
                class="btn btn-secondary btn-xs"
                type="button"
                :text="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'product.form.desc',
                    params: { id: product.id },
                  })
                "
              />
              <button
                v-if="!product.not_deletable"
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                data-original-title="btn btn-danger btn-xs"
                :title="$t('common.delete')"
                @click.prevent="deleteProduct(product)"
              >
                <i class="fa fa-trash-o" />
              </button>
            </td>
          </tr>
        </BaseDatatable>
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';

export default {
  name: 'ProductList',
  components: {
    BaseSelect,
    BaseFieldGroup,
    BaseTableHeader,
    BaseButton,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('product/getProductsList', {
        page: 1,
        field: {},
      }),
      store.dispatch('property/getPropertiesList', {
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
      productFilter: {
        product_family_id: null,
        product_type_id: null,
        product_unit_id: null,
        properties: {},
      },
    };
  },
  computed: {
    ...mapGetters('product', ['getProductsByFilter']),
    ...mapGetters('product_family', ['productFamilies']),
    ...mapGetters('product_type', ['productTypes']),
    ...mapGetters('product_unit', ['productUnits']),
    ...mapGetters('property', ['properties']),
    filterableProperties() {
      return this.properties.filter((p) => p.property_type.is_list);
    },
    products() {
      return this.getProductsByFilter(this.productFilter);
    },
    filterProductTypes() {
      return this.productTypes.filter((pt) =>
        this.productFilter?.product_family_id
          ? pt.product_family_id === this.productFilter?.product_family_id
          : true
      );
    },
  },
  watch: {
    products() {
      if (!this.$store.state.globalLoading) {
        this.$store.dispatch('setGlobalLoading', true);
        setTimeout(() => this.$store.dispatch('setGlobalLoading', false), 2000);
      }
    },
  },
  created() {
    this.$store.commit('product/SET_CURRENT_PRODUCT', null);
  },
  methods: {
    deleteProduct(product) {
      if (confirm(this.$t('messages.confirmDelete', { label: product.name })))
        this.$store.dispatch('product/deleteProduct', product.id);
    },
  },
};
</script>

<style scoped></style>
