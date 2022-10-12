<template>
  <div class="row justify-content-center mt-2">
    <div class="col-md-10">
      <router-view :product="product" />
    </div>
  </div>
  <div class="card mb-0">
    <BaseTableHeader
      :title="`${$t('products.property.listTitle')} - ${product.reference}`"
      :add-action-router-name="
        $route.name === 'product.form.setting.property'
          ? 'product.form.setting.property.form'
          : null
      "
      :params="$route.params"
    />
    <div class="card-body">
      <div class="user-status table-responsive">
        <table class="table table-bordernone">
          <thead>
            <tr>
              <th scope="col">{{ $t('common.attributes.property_id') }}</th>
              <th scope="col">
                {{ $t('common.attributes.value') }}
              </th>
              <th scope="col" class="text-center">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <ProductPropertyLine
              v-for="(property, index) in product_properties"
              :key="index"
              :product-property="property"
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
import ProductPropertyLine from '/@/components/products/ProductPropertyLine.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  name: 'ProductProperties',
  components: { BaseTableHeader, ProductPropertyLine },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('property/getPropertiesList', {
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
    product_properties() {
      return this.product.product_properties ?? [];
    },
  },
};
</script>

<style scoped></style>
