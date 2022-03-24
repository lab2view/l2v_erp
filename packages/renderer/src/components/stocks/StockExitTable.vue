<template>
  <BaseDatatable :tfoot="false" :total="stockExits.length">
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
        <BaseButton
          type="button"
          :class="`btn btn-iconsolid btn-sm ${
            stockExit.not_deletable ? 'btn-success' : 'btn-secondary'
          }`"
          :title="$t('common.update')"
          @click.prevent="
            $router.push({
              name: `stocks.exit.form.${
                stockExit.not_deletable ? 'article' : 'desc'
              }`,
              params: { id: stockExit.id },
            })
          "
        >
          {{ $t(`common.${stockExit.not_deletable ? 'show' : 'update'}`) }}
        </BaseButton>
        <button
          v-if="!stockExit.not_deletable"
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
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
export default {
  name: 'StockExitTable',
  components: { BaseButton, BaseDatatable },
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
