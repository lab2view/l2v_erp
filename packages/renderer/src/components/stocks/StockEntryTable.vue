<template>
  <BaseDatatable :tfoot="false" :total="stockEntries.length">
    <template #headers>
      <th>#</th>
      <th>{{ $t('common.headers.enterprise_id') }}</th>
      <th>{{ $t('common.attributes.stock_type') }}</th>
      <th>{{ $t('common.headers.provider') }}</th>
      <th>{{ $t('common.attributes.reference') }}</th>
      <th>{{ $t('common.attributes.created_at') }}</th>
      <th>{{ $t('common.actions') }}</th>
    </template>
    <tr v-for="stockEntry in stockEntries" :key="stockEntry.id">
      <td>{{ stockEntry.id }}</td>
      <td>
        {{
          stockEntry.enterprise
            ? stockEntry.enterprise.name
            : $t('common.parent')
        }}
      </td>
      <td>{{ stockEntry.stock_type.label }}</td>
      <td>
        {{ stockEntry.enterprise_sender?.label || $t('common.parent') }}
      </td>
      <td>{{ stockEntry.reference }}</td>
      <td>{{ stockEntry.created_at }}</td>
      <td>
        <button
          v-if="!stockEntry.not_deletable"
          class="btn btn-danger btn-xs m-l-5"
          type="button"
          data-original-title="btn btn-danger btn-xs"
          :title="$t('common.delete')"
          @click.prevent="deleteStockEntry(stockEntry)"
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
  name: 'StockEntryTable',
  components: { BaseDatatable },
  props: {
    stockEntries: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteStockEntry(stockEntry) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: stockEntry.id }))
      ) {
        //     this.$store.dispatch(
        //       'stock_entry/deleteStockEntry',
        //       stockEntry.id
        //     );
        console.log('stockEntry', stockEntry);
      }
    },
  },
};
</script>

<style scoped></style>
