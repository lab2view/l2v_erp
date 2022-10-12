<template>
  <div class="row justify-content-center mt-2">
    <div class="col-md-10">
      <router-view :product="product" />
    </div>
  </div>
  <div class="card mb-0">
    <BaseTableHeader
      :title="`${$t('products.tax.listTitle')} - ${product.reference}`"
      :add-action-router-name="
        $route.name === 'product.form.setting.tax'
          ? 'product.form.setting.tax.form'
          : null
      "
      :params="$route.params"
    />
    <div class="card-body">
      <div class="user-status table-responsive">
        <table class="table table-bordernone">
          <thead>
            <tr>
              <th scope="col">{{ $t('common.attributes.tax_id') }}</th>
              <th scope="col">{{ $t('common.attributes.value') }}</th>
              <th scope="col" class="text-center">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <ProductTaxLine
              v-for="(tax, index) in product_taxes"
              :key="index"
              :product-tax="tax"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store';
import ProductTaxLine from '/@/components/products/ProductTaxLine.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  name: 'ProductTaxList',
  components: { BaseTableHeader, ProductTaxLine },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('tax/getTaxesList', {
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
  computed: {
    ...mapGetters('product', ['product']),
    product_taxes() {
      return this.product.product_taxes ?? [];
    },
  },
};
</script>

<style scoped></style>
