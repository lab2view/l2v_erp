<template>
  <BaseDatatable
    v-if="!$store.state.globalLoading"
    :tfoot="false"
    :total="stockExpiredEntryLines.length"
  >
    <template #headers>
      <th>#</th>
      <th>{{ $t('common.attributes.name') }}</th>
      <th>{{ $t('common.attributes.barcode') }}</th>
      <th>{{ $t('common.attributes.reference') }}</th>
      <th>{{ $t('common.attributes.quantity') }}</th>
      <th>{{ $t('common.attributes.expiry_date') }}</th>
    </template>
    <tr
      v-for="stockExpiredEntryLine in stockExpiredEntryLines"
      :key="stockExpiredEntryLine.id"
    >
      <td>
        {{ stockExpiredEntryLine.id }}
      </td>
      <td>
        {{ stockExpiredEntryLine.article.product.name }}
      </td>
      <td>
        {{ stockExpiredEntryLine.article.product.code }} /
        {{ stockExpiredEntryLine.article.product.reference }}
      </td>
      <td>{{ stockExpiredEntryLine.article.product.reference }}</td>
      <td>{{ stockExpiredEntryLine.quantity }}</td>
      <td>{{ $d(stockExpiredEntryLine.expires_at, 'short') }}</td>
    </tr>
  </BaseDatatable>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';

export default {
  name: 'StockExpiredEntryTableLine',
  components: { BaseDatatable },
  props: {
    stockExpiredEntryLines: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
