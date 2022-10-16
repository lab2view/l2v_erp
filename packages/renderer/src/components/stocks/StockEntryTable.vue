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
        <BaseButton
          type="button"
          :class="`btn btn-iconsolid btn-${
            stockEntry.not_deletable ? 'success' : 'secondary'
          } btn-sm`"
          :title="$t(`common.${stockEntry.not_deletable ? 'show' : 'update'}`)"
          @click.prevent="
            $router.push({
              name: `stocks.entry.form.${
                stockEntry.not_deletable ? 'article' : 'desc'
              }`,
              params: { id: stockEntry.id },
            })
          "
        >
          {{ $t(`common.${stockEntry.not_deletable ? 'show' : 'update'}`) }}
        </BaseButton>
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
import BaseButton from '/@/components/common/BaseButton.vue';
export default {
  name: 'StockEntryTable',
  components: { BaseButton, BaseDatatable },
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
