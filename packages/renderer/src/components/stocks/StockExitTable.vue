<template>
  <BaseDatatable :tfoot="false" :total="stockExits.length">
    <template #headers>
      <th>#</th>
      <th>{{ $t('common.attributes.stock_type') }}</th>
      <th>{{ $t('common.attributes.enterprise') }}</th>
      <th>{{ $t('common.attributes.receiver_structure') }}</th>
      <th>{{ $t('common.attributes.cashier') }}</th>
      <th>{{ $t('common.attributes.reference') }}</th>
      <th>{{ $t('common.actions') }}</th>
    </template>
    <tr v-for="stockExit in stockExits" :key="stockExit.id">
      <td>{{ stockExit.id }}</td>
      <td>{{ stockExit.stock_type?.label }}</td>
      <td>{{ stockExit.enterprise?.name }}</td>
      <td>{{ stockExit.enterprise_receiver?.name }}</td>
      <td>{{ stockExit.cashier?.name }}</td>
      <td>{{ stockExit.reference }}</td>
      <td>
        <button
          :title="$t('common.delete')"
          class="btn btn-danger btn-xs m-l-5"
          data-original-title="btn btn-danger btn-xs"
          type="button"
          @click.prevent="deleteStockExit(stockExit)"
        >
          <i class="fa fa-trash-o" />
        </button>
      </td>
    </tr>
  </BaseDatatable>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
export default {
  name: 'StockExitTable',
  components: { BaseDatatable },
  props: {
    stockExits: {
      type: Array,
      required: true,
    },
  },

  methods: {
    deleteStockExit(stockExit) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: stockExit.reference })
        )
      )
        this.$store.dispatch('stock_exit/deleteStockExit', stockExit.id);
    },
  },
};
</script>

<style scoped></style>
