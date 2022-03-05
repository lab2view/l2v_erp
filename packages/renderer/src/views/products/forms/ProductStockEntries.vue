<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>{{ $t('stock.stockEntry.list') }}</h6>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{ name: 'stocks.entry.form.desc' }"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-save m-r-5" />
            {{ $t('stock.stockEntry.add') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body pb-0">
      <StockEntryTable :stock-entries="[]" />
    </div>
  </div>
</template>

<script>
import StockEntryTable from '/@/components/stocks/StockEntryTable.vue';
export default {
  components: { StockEntryTable },
};
</script>

<style scoped></style>
