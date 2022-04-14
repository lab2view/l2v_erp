<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store/index.js';
import { actionCode, moduleCode } from '/@/helpers/codes.js';
import { getMutationPathName } from '/@/helpers/utils.js';
import { mapGetters } from 'vuex';
import { notify } from '/@/helpers/notify.js';
import initEcho from '/@/config/echo.js';

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
  computed: {
    ...mapGetters('auth', ['currentUser']),
  },
  created() {
    initEcho().then((echo) => {
      echo
        .private(`synchronisation.${moduleCode.products.toLowerCase()}`)
        .listen('.module.synchronisation', (change) => {
          if (change.user_id === this.currentUser.id) {
            this.$store.commit('product/SET_PRODUCTS_HASH', change.hash);
          } else {
            const mutation = getMutationPathName(change);
            if (mutation) {
              const commitPayload =
                change.action === actionCode.deleted
                  ? change.model.id
                  : change.model;
              this.$store.commit(mutation, commitPayload);
              this.$store.commit('product/SET_PRODUCTS_HASH', change.hash);
            }
            notify(`${change.action} ${change.mutation}`, 'New Event', 'info');
          }
          console.log(change);
        });
    });
  },
};
</script>

<style scoped></style>
