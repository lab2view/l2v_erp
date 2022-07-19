<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>{{ $t('stocks.stockExit.listTitle') }}</h5>
        </div>
      </div>
    </div>
    <div class="card-body">
      <StockExitTable :stock-exits="stockExits" />
    </div>
    <router-view />
  </div>
</template>

<script>
import StockExitTable from '/@/components/stocks/StockExitTable.vue';
import store from '../../../store';
import { mapGetters } from 'vuex';
export default {
  components: { StockExitTable },

  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('stock_exit/getStockExitsList', {
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
    ...mapGetters('stock_exit', ['getStockExitsByProductId']),

    stockExits() {
      return this.getStockExitsByProductId(this.product.id);
    },
  },
};
</script>

<style scoped></style>
