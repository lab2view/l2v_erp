<template>
  <BaseDatatable
    v-if="!$store.state.globalLoading"
    :tfoot="false"
    :total="shippingEntries.length"
  >
    <template #headers>
      <th>#</th>
      <!--      <th>{{ $t('common.attributes.stock_entry') }}</th>-->
      <th>{{ $t('common.attributes.reference') }}</th>
      <th>{{ $t('common.attributes.status') }}</th>
      <th>{{ $t('common.attributes.delivery_date') }}</th>
      <th>{{ $t('common.actions') }}</th>
    </template>
    <tr v-for="shippingEntry in shippingEntries" :key="shippingEntry.id">
      <td>{{ shippingEntry.id }}</td>
      <!--      <td>{{ shippingEntry.stock_entry.label }}</td>-->
      <td>{{ shippingEntry.reference }}</td>
      <td>
        {{
          shippingEntry.stock_entry?.current_state?.stock_state.label ||
          $t('common.not_set')
        }}
      </td>
      <td>{{ $d(shippingEntry.delivery_date, 'short') }}</td>
      <td>
        <BaseActionBtnGroup
          entity="Shipping"
          :with-show-btn="shippingEntry.is_confirm"
          :with-update-btn="!shippingEntry.is_confirm"
          :with-delete-btn="!shippingEntry.is_confirm"
          @update="
            $router.push({
              name: `shipping.form.desc`,
              params: { id: shippingEntry.id },
            })
          "
          @show="
            $router.push({
              name: `shipping.form.article`,
              params: { id: shippingEntry.id },
            })
          "
          @delete="deleteShipping(shippingEntry)"
        />
      </td>
    </tr>
  </BaseDatatable>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';
export default {
  name: 'ShippingEntryTable',
  components: { BaseActionBtnGroup, BaseDatatable },
  props: {
    shippingEntries: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteShipping(shippingEntry) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: shippingEntry.id }))
      ) {
        this.$store.dispatch('shipping/deleteShipping', shippingEntry.id);
      }
    },
  },
};
</script>

<style scoped></style>
