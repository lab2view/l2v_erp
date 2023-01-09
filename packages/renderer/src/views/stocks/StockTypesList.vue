<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('stocks.stockType.listTitle')"
        add-action-router-name="config.stocks.type.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="stock_type/getStockTypesList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="stock_types.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.stock_variety') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <template v-if="stock_types.length">
            <tr v-for="stockType in stock_types" :key="stockType.id">
              <td>{{ stockType.id }}</td>
              <td>{{ stockType.label }}</td>
              <td>
                {{
                  stockType.type_for
                    ? $t(`stocks.${stockType.type_for.toLowerCase()}`)
                    : $t('common.none')
                }}
              </td>
              <td>
                <BaseActionBtnGroup
                  entity="StockType"
                  :with-show-btn="false"
                  :with-delete-btn="!stockType.not_deletable"
                  @update="
                    $router.push({
                      name: 'config.stocks.type.form',
                      params: { id: stockType.id },
                    })
                  "
                  @delete="deleteStockType(stockType)"
                />
              </td>
            </tr>
          </template>
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
  name: 'StockTypesList',
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('stock_type/getStockTypesList', {
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
    ...mapGetters('stock_type', ['stock_types', 'stockType']),
  },
  created() {
    if (this.stockType)
      this.$store.commit('stock_type/SET_CURRENT_STOCK_TYPE', null);
  },

  methods: {
    deleteStockType(stockType) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: stockType.label }))
      )
        this.$store.dispatch('stock_type/deleteStockType', stockType.id);
    },
  },
};
</script>

<style scoped></style>
