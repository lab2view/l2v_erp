<template>
  <div class="card m-0 p-0">
    <SaleSessionHeader />

    <form @submit.prevent="handleSaleProcessButton">
      <div
        :class="`card-body pb-2 ${isEscaleMarketWorkspace ? 'mt-1 pt-1' : ''}`"
      >
        <div class="row align-items-center">
          <SaleSessionSelectedArticleList />
        </div>
      </div>

      <SaleSessionState :loading="loading" />
    </form>
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
import { mapGetters } from 'vuex';

export default {
  name: 'CashierSessionPage',
  components: {
    SaleSessionState,
    SaleSessionSelectedArticleList,
    SaleSessionHeader,
  },
  mixins: [ModuleSyncMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    // const hash = store.getters['product/getProductsHash'];
    const cashier_id =
      store.getters['cashier_session/currentSession'].cashier_id;
    // if (hash) {
    //   return Promise.all([
    //     store.dispatch('initModuleSynchronisation', {
    //       module: moduleCode.products,
    //       hash: hash,
    //       mutation: 'product',
    //     }),
    //     store.dispatch('sale/getCashierSaleList', { cashier_id }),
    //   ]).finally(() => next());
    // } else {
    const field = { page: 1, field: {} };
    return Promise.all([
      store.dispatch('article/getArticlesList', field),
      store.dispatch('customer/getCustomersList', field),
      store.dispatch('tax/getTaxesList', field),
      store.dispatch('sale/getCashierSaleList', { cashier_id }),
      store.dispatch('price_type/getPriceTypeList', field),
      // store.dispatch('getLastHash', moduleCode.products).then((data) => {
      //   store.commit('product/SET_PRODUCTS_HASH', data.hash);
      //   return data;
      // }),
    ])
      .then(() => next())
      .catch((error) => {
        console.log(error);
        next();
      });
    // }
  },
  data() {
    return {
      loading: false,
      errors: [],
    };
  },
  created() {
    this.initEchoSync(moduleCode.products, 'product');
    this.$store.dispatch('printer/initPrint').then(() => {
      this.$store.dispatch('printer/getInstalledPrinters');
    });
  },
  computed: {
    ...mapGetters('printer', ['printAfterSale']),
  },
  methods: {
    handleSaleProcessButton() {
      if (this.loading) return;

      this.loading = true;
      this.errors = [];
      this.$store
        .dispatch('cashier_session/processToCurrentSaleRequest')
        .then((data) => {
          this.$store.commit('cashier_session/RESET_CURRENT_SALE_REQUEST');
          if (this.printAfterSale)
            this.$store.dispatch('printer/printSaleBill', data);
          else
            this.$router.push({
              name: 'sales.session.cashier.sale.detail',
              params: { ...this.$route.params, sale_id: data.id },
            });
        })
        .catch((error) => (this.errors = error.response?.data?.errors))
        .finally(() => (this.loading = false));
    },
  },
};
</script>
