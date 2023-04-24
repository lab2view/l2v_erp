<template>
  <StockExpiredEntryTableLine
    :stock-expired-entry-lines="stock_expired_entry_lines"
  />
  <router-view />
</template>

<script>
import store from '../../../store';
import { mapGetters } from 'vuex';
import StockExpiredEntryTableLine from '/@/components/stocks/StockExpiredEntryTableLine.vue';

export default {
  name: 'StockExpiredEntriesList',
  components: { StockExpiredEntryTableLine },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('stock_entry_line/getStockExpiredEntryLinesList', {
        page: 1,
        field: {},
      }),
    ])
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  computed: {
    ...mapGetters('stock_entry_line', ['stock_expired_entry_lines']),
  },
};
</script>

<style scoped></style>
