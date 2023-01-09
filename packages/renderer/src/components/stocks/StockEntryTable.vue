<template>
  <BaseDatatable
    v-if="!$store.state.globalLoading"
    :tfoot="false"
    :total="stockEntries.length"
  >
    <template #headers>
      <th>#</th>
      <th>{{ $t('common.headers.enterprise_id') }}</th>
      <th>{{ $t('common.attributes.stock_type') }}</th>
      <th>{{ $t('common.attributes.reference') }}</th>
      <th>{{ $t('common.attributes.status') }}</th>
      <th>{{ $t('common.attributes.date') }}</th>
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
      <td>{{ stockEntry.reference }}</td>
      <td>
        {{
          stockEntry.current_state?.stock_state.label || $t('common.not_set')
        }}
      </td>
      <td>{{ $d(stockEntry.created_at, 'short') }}</td>
      <td>
        <BaseActionBtnGroup
          entity="StockEntry"
          :with-show-btn="stockEntry.not_deletable"
          :with-update-btn="!stockEntry.not_deletable"
          :with-delete-btn="!stockEntry.not_deletable"
          @update="
            $router.push({
              name: `stocks.entry.form.desc`,
              params: { id: stockEntry.id },
            })
          "
          @show="
            $router.push({
              name: `stocks.entry.form.article`,
              params: { id: stockEntry.id },
            })
          "
          @delete="deleteStockEntry(stockEntry)"
        />
      </td>
    </tr>
  </BaseDatatable>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';
export default {
  name: 'StockEntryTable',
  components: { BaseActionBtnGroup, BaseDatatable },
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
        this.$store.dispatch('stock_entry/deleteStockEntry', stockEntry.id);
      }
    },
  },
};
</script>

<style scoped></style>
