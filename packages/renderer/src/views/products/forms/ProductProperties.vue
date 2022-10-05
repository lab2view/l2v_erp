<template>
  <div class="row justify-content-center mt-2">
    <div class="col-md-10">
      <router-view :product="product" />
    </div>
  </div>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('products.property.listTitle')} - ${product.reference}` }}
          </h5>
        </div>
        <div
          v-if="$route.name === 'product.form.setting.property'"
          class="col-sm-auto align-items-end"
        >
          <router-link
            :to="{
              name: 'product.form.setting.property.form',
              params: {
                ...$route.params,
              },
            }"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.add') }}
          </router-link>
        </div>
      </div>
    </div>
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

export default {
  components: { ProductPropertyLine },
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
