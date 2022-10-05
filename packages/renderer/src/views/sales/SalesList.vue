<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.sale.listTitle')"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="sale/getSalesList"
      />
      <div class="card-body">
        <SaleTable :sales="sales" />
      </div>
      <router-view />

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import SaleTable from '/@/components/sales/SaleTable.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, SaleTable, BaseContainer },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('sale/getSalesList', {
        page: 1,
        field: {},
      })
      .finally(() => next());
  },
  computed: {
    ...mapGetters('sale', ['sales']),
  },
};
</script>

<style scoped></style>
