<template>
  <BaseContainer :module="$t('menu.modules.stocks')" :title="$t('stocks.title')">
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('stocks.stockExit.listTitle') }}</h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <StockExitTable :stock-exits="stock_exits" />
      </div>
      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import StockExitTable from '/@/components/stocks/StockExitTable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: { StockExitTable, BaseContainer },
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
    ...mapGetters('stock_exit', ['stock_exits']),
  },
};
</script>

<style scoped></style>
