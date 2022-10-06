<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>{{ $t('stocks.stockEntry.list') }}</h6>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{
              name: 'product.form.stocks.entry.supply',
              params: { ...$route.params },
            }"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-save m-r-5" />
            {{ $t('stocks.stockEntry.add') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body pb-0">
      <StockEntryTable :stock-entries="stockEntries" />
    </div>
  </div>
</template>

<script>
import StockEntryTable from '/@/components/stocks/StockEntryTable.vue';
import store from '../../../store';
import { mapGetters } from 'vuex';
export default {
  name: 'ProductStockEntries',
  components: { StockEntryTable },
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
    ...mapGetters('product', ['product']),
    ...mapGetters('stock_entry', ['getStockEntriesByProductId']),

    stockEntries() {
      return this.getStockEntriesByProductId(this.product.id);
    },
  },
};
</script>

<style scoped></style>
