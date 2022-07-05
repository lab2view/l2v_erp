<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('sales.sale.listTitle') }}</h5>
          </div>
        </div>
      </div>
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

export default {
  components: { SaleTable, BaseContainer },
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
