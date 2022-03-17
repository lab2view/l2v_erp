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
      <StockExitTable :stock-exits="[]" />
    </div>
    <router-view />
  </div>
</template>

<script>
import StockExitTable from '/@/components/stocks/StockExitTable.vue';
export default {
  components: { StockExitTable },
};
</script>

<style scoped></style>
