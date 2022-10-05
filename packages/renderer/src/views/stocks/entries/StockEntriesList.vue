<template>
  <BaseContainer
    :title="$t('stocks.title')"
    :module="$t('menu.modules.stocks')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('stocks.stockEntry.list')"
        add-action-router-name="stocks.entry.form.desc"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="stock_entry/getStockEntriesList"
        add-action-label="stocks.stockEntry.add"
      />
      <div class="card-body pb-0">
        <StockEntryTable :stock-entries="stock_entries" />
      </div>
      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import store from '../../../store';
import { mapGetters } from 'vuex';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import StockEntryTable from '/@/components/stocks/StockEntryTable.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  name: 'StockEntriesList',
  components: { BaseTableHeader, StockEntryTable, BaseContainer },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('stock_entry/getStockEntriesList', {
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
    ...mapGetters('stock_entry', ['stock_entries']),
  },
};
</script>

<style scoped></style>
