<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.sale.listTitle')"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="sale/getSalesList"
      />
      <div class="card-body">
        <SaleTable :sales="selectedSaleList" />
      </div>
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
import _ from 'lodash';
import { priceTypeCode } from '/@/helpers/codes.js';

export default {
  name: 'SalesList',
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
    selectedSaleList() {
      return this.sales.map((sale) => {
        const totalSupPrice = _.sumBy(sale.stock_exit_lines, 'sup_price');
        const totalArticleBuyPrice = _.sumBy(
          sale.stock_exit_lines.map((sel) => {
            const price = sel.article?.prices?.find(
              (p) => p.price_type.code === priceTypeCode.buy
            );
            return { buy_price: price?.value ?? 0 };
          }),
          'buy_price'
        );
        const sale_amount =
          totalSupPrice - (sale.discount ? parseFloat(sale.discount) : 0);
        const sale_win_amount = (sale_amount - totalArticleBuyPrice).toFixed(2);

        const quantities = _(sale.stock_exit_lines)
          .groupBy((sel) => sel.article.product.product_unit.label)
          .map((objs, key) => {
            return {
              unit: key,
              total: _.sumBy(objs, 'quantity'),
            };
          })
          .value();

        return {
          id: sale.id,
          enterprise: {
            id: sale.enterprise_id,
            name: sale.enterprise?.name ?? $t('common.parent'),
          },
          reference: sale.reference,
          code: sale.code,
          sup_amount: totalSupPrice,
          discount: sale.discount ?? 0,
          sale_amount,
          created_at: sale.created_at,
          sale_win_amount: parseFloat(sale_win_amount),
          sale_win_amount_percent: parseFloat(
            ((sale_win_amount * 100) / totalArticleBuyPrice).toFixed(2)
          ),
          quantities,
        };
      });
    },
  },
};
</script>

<style scoped></style>
