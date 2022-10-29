<template>
  <BaseModal
    :title="`${$t('sales.session.close_title', {
      cashRegister: cashRegisterName,
      date: $d(sessionSaleReportDate, 'date'),
    })}`"
    modal-size="xl"
    modal-body-class="pb-0 pt-0 p-l-5 p-r-5"
  >
    <div class="card-body p-0" v-if="getSelecteCashierSaleList.length">
      <SaleTable
        :sales="getSelecteCashierSaleList"
        :is-cashier-session="true"
      />
    </div>
    <div v-else class="card-body">
      <h6 class="f-w-300">{{ $t('sales.session.no_sale').toUpperCase() }}</h6>
    </div>

    <router-view />
    <template #footer> table footer </template>
  </BaseModal>
</template>

<script>
import BaseModal from '/@/components/common/BaseModal.vue';
import ArticleSearchResultLine from '/@/components/sales/session/ArticleSearchResultLine.vue';
import BasePaginate from '/@/components/common/BasePaginate.vue';
import store from '/@/store/index';
import { mapGetters } from 'vuex';
import SaleSessionMixin from '/@/mixins/SaleSessionMixin';
import SaleTable from '/@/components/sales/SaleTable.vue';

export default {
  name: 'CashierSessionReports',
  components: { SaleTable, BasePaginate, ArticleSearchResultLine, BaseModal },
  mixins: [SaleSessionMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    const cashier_id =
      store.getters['cashier_session/currentSession'].cashier_id;
    store
      .dispatch('sale/getCashierSaleList', { cashier_id, search: true })
      .finally(() => next());
  },
  data() {
    return {
      loading: true,
      created_at: null,
    };
  },
  computed: {
    ...mapGetters('sale', ['cashier_sales', 'getSelecteCashierSaleList']),
    sessionSaleReportDate() {
      return this.created_at ?? new Date();
    },
  },
};
</script>

<style scoped></style>
