<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('stocks.stockExit.listTitle')"
        add-action-router-name="stocks.exit.form.desc"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="stock_exit/getStockExitsList"
        add-action-label="stocks.stockExit.add"
      />
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
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  name: 'StockExitsList',
  components: { BaseTableHeader, StockExitTable, BaseContainer },
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
