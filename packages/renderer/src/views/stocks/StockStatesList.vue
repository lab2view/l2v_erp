<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('stocks.stockState.listTitle')"
        add-action-router-name="config.stocks.state.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="stock_state/getStockStatesList"
        entity="StockState"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="stock_states.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.stock_variety') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="stockState in stock_states" :key="stockState.id">
            <td>{{ stockState.id }}</td>
            <td>{{ stockState.label }}</td>
            <td>
              {{
                stockState.state_for
                  ? $t(`stocks.${stockState.state_for.toLowerCase()}`)
                  : $t('common.none')
              }}
            </td>
            <td>
              <BaseActionBtnGroup
                entity="StockState"
                :with-show-btn="false"
                :with-delete-btn="!stockState.not_deletable"
                @update="
                  $router.push({
                    name: 'config.stocks.state.form',
                    params: { id: stockState.id },
                  })
                "
                @delete="deleteStockState(stockState)"
              />
            </td>
          </tr>
        </BaseDatatable>
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'StockStatesList',
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('stock_state/getStockStatesList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  computed: {
    ...mapGetters('stock_state', ['stock_states', 'stockState']),
  },
  created() {
    if (this.stockState)
      this.$store.commit('stock_state/SET_CURRENT_STOCK_STATE', null);
  },

  methods: {
    deleteStockState(stockState) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: stockState.label }))
      )
        this.$store.dispatch('stock_state/deleteStockState', stockState.id);
    },
  },
};
</script>

<style scoped></style>
