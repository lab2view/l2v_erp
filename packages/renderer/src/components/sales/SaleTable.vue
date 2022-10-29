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
      <th v-if="!isCashierSession">{{ $t('common.headers.win_amount') }}</th>
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
      <td v-if="!isCashierSession">
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
        <BaseButton
          type="button"
          class="btn btn-sm btn-success"
          :title="$t('common.show')"
          :text="$t('common.show')"
          @click.prevent="
            $router.push({
              name: 'sales.sales.details',
              params: { id: sale.id },
            })
          "
        />
        <BaseButton
          class="btn btn-danger btn-xs m-l-5"
          type="button"
          :title="$t('common.delete')"
          @click.prevent="deleteSale(sale)"
        >
          <i class="fa fa-trash-o" />
        </BaseButton>
      </td>
    </tr>
    <template #footers>
      <th :colspan="isCashierSession ? 0 : 2" class="text-center">
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
      <th colspan="3" v-if="!isCashierSession">
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

export default {
  name: 'SaleTable',
  components: { BaseButton, BaseDatatable },
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
    ...mapGetters('auth', ['isRoleAdmin']),
    ...mapGetters('workspace', ['currency']),
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
