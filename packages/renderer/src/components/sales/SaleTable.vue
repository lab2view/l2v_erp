<template>
  <BaseDatatable
    v-if="!$store.state.globalLoading"
    :tfoot="true"
    :total="sales.length"
    :scroll-y="isCashierSession ? '530px' : false"
  >
    <template #headers>
      <th>#</th>
      <th v-if="isRoleAdmin">{{ $t('common.attributes.structure') }}</th>
      <th>{{ $t('common.attributes.reference') }}</th>
      <th>{{ $t('common.headers.quantity') }}</th>
      <th>{{ $t('common.headers.sub_amount') }}</th>
      <th>{{ $t('common.attributes.discount') }}</th>
      <th>{{ $t('common.headers.total_price') }}</th>
      <th v-if="showTotalWinAmount">{{ $t('common.headers.win_amount') }}</th>
      <th>
        {{ $t(`common.attributes.${isCashierSession ? 'time' : 'date'}`) }}
      </th>
      <th v-if="!isCashierSession">{{ $t('common.actions') }}</th>
    </template>
    <tr v-for="sale in sales" :key="`sale-line-${sale.id}`">
      <td>{{ sale.id }}</td>
      <td v-if="isRoleAdmin">
        {{ sale.enterprise.name ?? $t('common.parent') }}
      </td>
      <td>
        <router-link
          v-if="isCashierSession"
          :to="{
            name: 'sales.session.reports.details',
            params: { id: sale.id },
          }"
        >
          {{ sale.code }}
        </router-link>
        <span v-else>{{ sale.code }}</span>
      </td>
      <td>
        <label
          v-for="(quantity, index) in sale.quantities"
          :key="`qty-${index}`"
          class="f-w-700 m-r-5"
        >
          {{ quantity.total }}
          <i class="f-w-400">{{ quantity.unit }}</i>
        </label>
      </td>
      <td>{{ `${sale.sup_amount}` }}</td>
      <td>{{ sale.discount }}</td>
      <td>{{ sale.sale_amount }}</td>
      <td v-if="showTotalWinAmount">
        {{ `${sale.sale_win_amount}` }}
        <i
          :class="`f-w-400 font-${
            sale.sale_win_amount > 0 ? 'primary' : 'danger'
          }`"
        >
          {{ `(${sale.sale_win_amount_percent}%)` }}
        </i>
      </td>
      <td>{{ $d(sale.created_at, isCashierSession ? 'time' : 'short') }}</td>
      <td v-if="!isCashierSession">
        <BaseActionBtnGroup
          entity="Sale"
          :with-update-btn="false"
          @show="
            $router.push({
              name: 'sales.sales.details',
              params: { id: sale.id },
            })
          "
          @delete="deleteSale(sale)"
        />
      </td>
    </tr>
    <template #footers>
      <th :colspan="footerTotalColspan" class="text-center">
        {{ $t('common.headers.total').toUpperCase() }}
      </th>
      <th colspan="2" class="text-end">
        <label
          v-for="(saleTotalQuantity, index) in saleTotalQuantities"
          :key="`sale-total-qty-${index}`"
          class="f-w-700 m-r-5"
        >
          {{ saleTotalQuantity.total }}
          <i class="f-w-400">{{ saleTotalQuantity.unit }}</i>
        </label>
      </th>
      <th>{{ `${saleTotalSupAmount} ${currency}` }}</th>
      <th>{{ `${saleTotalDiscount} ${currency}` }}</th>
      <th :colspan="isCashierSession ? 2 : 0">
        {{ `${saleTotalSaleAmount} ${currency}` }}
      </th>
      <th v-if="showTotalWinAmount" colspan="3">
        {{ `${saleTotalWinAmount} ${currency}` }}
        <label :class="`font-${saleTotalWinAmount > 0 ? 'primary' : 'danger'}`">
          ({{ `${saleTotalWinAmountPercent} %` }})
        </label>
      </th>
    </template>
  </BaseDatatable>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import { mapGetters } from 'vuex';
import { getSaleAmount } from '/@/helpers/utils.js';
import BaseButton from '/@/components/common/BaseButton.vue';
import _ from 'lodash';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'SaleTable',
  components: { BaseActionBtnGroup, BaseButton, BaseDatatable },
  props: {
    sales: {
      type: Array,
      required: true,
    },
    isCashierSession: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('auth', ['isRoleAdmin', 'canShowSaleReportsMargin']),
    ...mapGetters('workspace', ['currency']),
    footerTotalColspan() {
      return this.isCashierSession ? 0 : this.canShowSaleReportsMargin ? 2 : 1;
    },
    saleTotalSupAmount() {
      return _.sumBy(this.sales, 'sup_amount').toFixed(2);
    },
    saleTotalDiscount() {
      return _.sumBy(this.sales, 'discount').toFixed(2);
    },
    saleTotalSaleAmount() {
      return _.sumBy(this.sales, 'sale_amount').toFixed(2);
    },
    saleTotalWinAmount() {
      return _.sumBy(this.sales, 'sale_win_amount').toFixed(2);
    },
    saleTotalAmountAfterDiscount() {
      return this.saleTotalSupAmount - this.saleTotalDiscount;
    },
    saleTotalWinAmountPercent() {
      return this.saleTotalAmountAfterDiscount > 0
        ? (
            (this.saleTotalWinAmount * 100) /
            this.saleTotalAmountAfterDiscount
          ).toFixed(2)
        : 100;
    },
    saleTotalQuantities() {
      let quantities = [];
      this.sales.forEach(
        (sale) => (quantities = [...quantities, ...sale.quantities])
      );
      return _(quantities)
        .groupBy('unit')
        .map((objs, key) => {
          return {
            unit: key,
            total: _.sumBy(objs, 'total'),
          };
        })
        .value();
    },
    showTotalWinAmount() {
      return !this.isCashierSession && this.canShowSaleReportsMargin;
    },
  },
  methods: {
    deleteSale(sale) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: sale.reference }))
      ) {
        this.$store.commit('SET_GLOBAL_LOADING', true);
        this.$store
          .dispatch('sale/deleteSale', sale.id)
          .finally(() => this.$store.commit('SET_GLOBAL_LOADING', false));
      }
    },

    getSaleAmountWithCurrency(sale) {
      return `${getSaleAmount(sale)} ${this.currency}`;
    },
  },
};
</script>

<style scoped></style>
