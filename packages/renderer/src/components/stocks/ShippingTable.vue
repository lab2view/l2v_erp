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
          shippingEntry.stock_entry.current_state?.stock_state.label ||
          $t('common.not_set')
        }}
      </td>
      <td>{{ $d(shippingEntry.delivery_date, 'short') }}</td>
      <td>
        <BaseButton
          type="button"
          :class="`btn btn-iconsolid btn-${
            shippingEntry.is_confirm ? 'success' : 'secondary'
          } btn-sm`"
          :title="$t(`common.${shippingEntry.is_confirm ? 'show' : 'update'}`)"
          @click.prevent="
            $router.push({
              name: `shipping.form.${
                shippingEntry.is_confirm ? 'article' : 'desc'
              }`,
              params: { id: shippingEntry.id },
            })
          "
        >
          {{ $t(`common.${shippingEntry.is_confirm ? 'show' : 'update'}`) }}
        </BaseButton>
        <button
          v-if="!shippingEntry.is_confirm"
          class="btn btn-danger btn-xs m-l-5"
          type="button"
          data-original-title="btn btn-danger btn-xs"
          :title="$t('common.delete')"
          @click.prevent="deleteShipping(shippingEntry)"
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
  name: 'ShippingEntryTable',
  components: { BaseButton, BaseDatatable },
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
