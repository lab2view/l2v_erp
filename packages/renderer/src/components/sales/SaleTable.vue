<template>
  <BaseDatatable :tfoot="false" :total="sales.length">
    <template #headers>
      <th>#</th>
      <th v-if="isRoleAdmin">{{ $t('common.attributes.structure') }}</th>
      <th>{{ $t('common.attributes.reference') }}</th>
      <th>{{ $t('common.attributes.amount') }}</th>
      <th>{{ $t('common.attributes.date') }}</th>
      <th>{{ $t('common.actions') }}</th>
    </template>
    <tr v-for="(sale, index) in sales" :key="sale.id">
      <td>{{ index + 1 }}</td>
      <td v-if="isRoleAdmin">
        {{ sale.enterprise?.name ?? $t('common.parent') }}
      </td>
      <td>{{ sale.code }}</td>
      <td>
        {{ getSaleAmountWithCurrency(sale) }}
      </td>
      <td>
        {{ $d(sale.created_at, 'short') }}
      </td>
      <td>
        <button
          class="btn btn-danger btn-xs m-l-5"
          data-original-title="btn btn-danger btn-xs"
          type="button"
          @click.prevent="cancelSale(sale)"
        >
          <i class="fa fa-times" /> Annuler
        </button>
      </td>
    </tr>
  </BaseDatatable>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import { mapGetters } from 'vuex';
import { getSaleAmount } from '/@/helpers/utils.js';
export default {
  components: { BaseDatatable },
  props: {
    sales: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['isRoleAdmin']),
    ...mapGetters('workspace', ['currency']),
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
