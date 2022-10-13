<template xmlns="http://www.w3.org/1999/html">
  <BaseDatatable :tfoot="true" :total="sales.length">
    <template #headers>
      <th>#</th>
      <th v-if="isRoleAdmin">{{ $t('common.attributes.structure') }}</th>
      <th>{{ $t('common.attributes.reference') }}</th>
      <th>{{ $t('common.headers.quantity') }}</th>
      <th>{{ $t('common.headers.sub_amount') }}</th>
      <th>{{ $t('common.attributes.discount') }}</th>
      <th>{{ $t('common.headers.total_price') }}</th>
      <th>{{ $t('common.headers.win_amount') }}</th>
      <th>{{ $t('common.attributes.date') }}</th>
      <th>{{ $t('common.actions') }}</th>
    </template>
    <tr v-for="sale in sales" :key="`sale-line-${sale.id}`">
      <td>{{ sale.id }}</td>
      <td v-if="isRoleAdmin">{{ sale.enterprise.name }}</td>
      <td>{{ sale.code }}</td>
      <td>
        <label
          class="f-w-700 m-r-5"
          v-for="(quantity, index) in sale.quantities"
          :key="`qty-${index}`"
        >
          {{ quantity.total }}
          <i class="f-w-400">{{ quantity.unit }}</i>
        </label>
      </td>
      <td>{{ `${sale.sup_amount}` }}</td>
      <td>{{ sale.discount }}</td>
      <td>{{ sale.sale_amount }}</td>
      <td class="">
        {{ `${sale.sale_win_amount}` }}
        <i
          :class="`f-w-400 font-${
            sale.sale_win_amount > 0 ? 'primary' : 'danger'
          }`"
        >
          {{ `(${sale.sale_win_amount_percent}%)` }}
        </i>
      </td>
      <td>{{ $d(sale.created_at, 'short') }}</td>
      <td>
        <BaseButton
          type="button"
          class="btn btn-sm btn-success"
          :title="$t('common.show')"
          @click.prevent=""
          :text="$t('common.show')"
        >
        </BaseButton>
        <BaseButton
          class="btn btn-danger btn-xs m-l-5"
          type="button"
          icon="fa fa-times"
          @click.prevent="cancelSale(sale)"
          :text="$t('common.cancel')"
        />
      </td>
    </tr>
    <template #footers>
      <th colspan="2" class="text-center">
        {{ $t('common.headers.total').toUpperCase() }}
      </th>
      <th colspan="2" class="text-end">
        <label
          class="f-w-700 m-r-5"
          v-for="(saleTotalQuantity, index) in saleTotalQuantities"
          :key="`sale-total-qty-${index}`"
        >
          {{ saleTotalQuantity.total }}
          <i class="f-w-400">{{ saleTotalQuantity.unit }}</i>
        </label>
      </th>
      <th>{{ `${saleTotalSupAmount} ${currency}` }}</th>
      <th>{{ `${saleTotalDiscount} ${currency}` }}</th>
      <th>{{ `${saleTotalSaleAmount} ${currency}` }}</th>
      <th colspan="3">
        {{ `${saleTotalWinAmount} ${currency}` }}
        <i class="f-w-400 m-r-5">Marge moyenne</i>
        <label :class="`font-${saleTotalWinAmount > 0 ? 'primary' : 'danger'}`">
          {{ `${saleTotalWinAmountPercent} %` }}
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
export default {
  name: 'SaleTable',
  components: { BaseButton, BaseDatatable },
  props: {
    sales: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['isRoleAdmin']),
    ...mapGetters('workspace', ['currency']),
    saleTotalSupAmount() {
      return _.sumBy(this.sales, 'sup_amount');
    },
    saleTotalDiscount() {
      return _.sumBy(this.sales, 'discount');
    },
    saleTotalSaleAmount() {
      return _.sumBy(this.sales, 'sale_amount');
    },
    saleTotalWinAmount() {
      return _.sumBy(this.sales, 'sale_win_amount').toFixed(2);
    },
    saleTotalWinAmountPercent() {
      return _.sumBy(this.sales, 'sale_win_amount_percent').toFixed(2);
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
  },
  methods: {
    cancelSale(sale) {
      if (confirm(this.$t('messages.confirmDelete', { label: sale.reference })))
        console.log(sale);
    },

    getSaleAmountWithCurrency(sale) {
      return `${getSaleAmount(sale)} ${this.currency}`;
    },
  },
};
</script>

<style scoped></style>
