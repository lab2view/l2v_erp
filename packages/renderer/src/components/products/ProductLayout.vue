<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store/index.js';
import { moduleCode } from '/@/helpers/codes.js';

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['product/getProductsHash'];
    if (hash) {
      return store
        .dispatch('initModuleSynchronisation', {
          module: moduleCode.products,
          hash: hash,
          mutation: 'product',
        })
        .finally(() => next());
    } else {
      const field = { page: 1, field: {} };
      return Promise.all([
        store.dispatch('article/getArticlesList', field),
        store.dispatch('product/getProductsList', field),
        store.dispatch('product_family/getProductFamiliesList', field),
        store.dispatch('product_type/getProductTypesList', field),
        store.dispatch('product_unit/getProductUnitsList', field),
        store.dispatch('property/getPropertiesList', field),
        store.dispatch('tax/getTaxesList', field),
        store.dispatch('package/getPackageList', field),
        store.dispatch('price_type/getPriceTypeList', field),
        store.dispatch('getLastHash', moduleCode.products).then((data) => {
          store.commit('product/SET_PRODUCTS_HASH', data.hash);
          return data;
        }),
      ])
        .then(() => next())
        .catch((error) => {
          console.log(error);
          next();
        });
    }
  },
  created() {
    this.$echo
      .private(`synchronisation.products.lsdjflksadjflkdsajf`)
      .listen('Synchronisation', (notification) => {
        console.debug(notification);
      });
  },
};
</script>

<style scoped></style>
