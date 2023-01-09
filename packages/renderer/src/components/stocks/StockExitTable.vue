<template>
  <BaseDatatable
    v-if="!$store.state.globalLoading"
    :tfoot="false"
    :total="stockExits.length"
  >
    <template #headers>
      <th>#</th>
      <th>{{ $t('common.attributes.stock_type') }}</th>
      <th v-if="isRoleAdmin">{{ $t('common.fields.enterprise_from') }}</th>
      <th>{{ $t('common.fields.enterprise_to') }}</th>
      <th>{{ $t('common.attributes.reference') }}</th>
      <th>{{ $t('common.attributes.status') }}</th>
      <th>{{ $t('common.attributes.date') }}</th>
      <th>{{ $t('common.actions') }}</th>
    </template>
    <tr v-for="stockExit in stockExits" :key="stockExit.id">
      <td>{{ stockExit.id }}</td>
      <td>{{ stockExit.stock_type.label }}</td>
      <td v-if="isRoleAdmin">
        {{
          stockExit.enterprise ? stockExit.enterprise.name : $t('common.parent')
        }}
      </td>
      <td>{{ stockExit.enterprise_receiver?.name }}</td>
      <td>{{ stockExit.reference }}</td>
      <td>
        {{ stockExit.current_state?.stock_state.label || $t('common.not_set') }}
      </td>
      <td>{{ $d(stockExit.created_at, 'short') }}</td>
      <td>
        <BaseActionBtnGroup
          entity="StockExit"
          :with-show-btn="stockExit.not_deletable"
          :with-update-btn="!stockExit.not_deletable"
          :with-delete-btn="!stockExit.not_deletable"
          @update="
            $router.push({
              name: `stocks.exit.form.desc`,
              params: { id: stockExit.id },
            })
          "
          @show="
            $router.push({
              name: `stocks.exit.form.article`,
              params: { id: stockExit.id },
            })
          "
          @delete="deleteStockExit(stockExit)"
        />
      </td>
    </tr>
  </BaseDatatable>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import { mapGetters } from 'vuex';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';
export default {
  name: 'StockExitTable',
  components: { BaseActionBtnGroup, BaseDatatable },
  props: {
    stockExits: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['isRoleAdmin']),
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
