<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store/index.js';
import { moduleCode } from '/@/helpers/codes.js';

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['product/getHash'];
    if (hash) {
      return store
        .dispatch('initModuleSynchronisation', {
          module: moduleCode.product,
          hash: hash,
          mutation: 'product',
        })
        .finally(() => next());
    } else {
      const field = { page: 1, field: {} };
      return Promise.all([
        store.dispatch('article/getArticlesList', field),
        store.dispatch('product/getProductsList', field),
        store.dispatch('productFamilyConfig/getProductFamiliesList', field),
        store.dispatch('productTypeConfig/getProductTypesList', field),
        store.dispatch('productUnitConfig/getProductUnitsList', field),
        store.dispatch('propertyConfig/getPropertiesList', field),
        store.dispatch('taxConfig/getTaxesList', field),
        store.dispatch('packageConfig/getPackageList', field),
        store.dispatch('priceTypeConfig/getPriceTypeList', field),
        store.dispatch('getLastHash', moduleCode.product).then((data) => {
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
};
</script>

<style scoped></style>
