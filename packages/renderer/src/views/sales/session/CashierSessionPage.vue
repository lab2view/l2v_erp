<template>
  <div class="card m-0 p-0">
    <SaleSessionHeader />

    <div class="card-body pb-2">
      <div class="row align-items-center">
        <SaleSessionSelectedArticleList />
      </div>
    </div>

    <SaleSessionState />
  </div>

  <router-view />
</template>

<script>
import SaleSessionHeader from '/@/components/sales/session/SaleSessionHeader.vue';
import SaleSessionSelectedArticleList from '/@/components/sales/session/SaleSessionSelectedArticleList.vue';
import SaleSessionState from '/@/components/sales/session/SaleSessionState.vue';
import store from '/@/store/index';
import { moduleCode } from '/@/helpers/codes';
import ModuleSyncMixin from '/@/mixins/ModuleSyncMixin';

export default {
  components: {
    SaleSessionState,
    SaleSessionSelectedArticleList,
    SaleSessionHeader,
  },
  mixins: [ModuleSyncMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['product/getProductsHash'];
    if (hash) {
      return Promise.all([
        store.dispatch('initModuleSynchronisation', {
          module: moduleCode.products,
          hash: hash,
          mutation: 'product',
        }),
        store.dispatch('sale/getCashierSaleList', {
          cashier_id:
            store.getters['cashier_session/currentSession'].cashier_id,
        }),
      ]).finally(() => next());
    } else {
      const field = { page: 1, field: {} };
      return Promise.all([
        store.dispatch('article/getArticlesList', field),
        store.dispatch('tax/getTaxesList', field),
        store.dispatch('sale/getCashierSaleList', {
          cashier_id:
            store.getters['cashier_session/currentSession'].cashier_id,
        }),
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
    this.initEchoSync(moduleCode.products, 'product');
    this.$store.dispatch('printer/initPrint').then(() => {
      this.$store.dispatch('printer/getInstalledPrinters');
    });
  },
};
</script>
