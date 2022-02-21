<template>
  <BaseContainer :module="$t('menu.modules.stocks')" :title="$t('stock.title')">
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('stock.stockState.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'config.stocks.state.form' }"
              class="btn btn-primary"
              href="#"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="stock_states.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.stock_type') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="stockState in stock_states" :key="stockState.id">
            <td>{{ stockState.id }}</td>
            <td>{{ stockState.label }}</td>
            <td>
              {{
                stockState.state_for
                  ? $t(`stock.${stockState.state_for.toLowerCase()}`)
                  : $t('common.none')
              }}
            </td>
            <td>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'config.stocks.state.form',
                    params: { id: stockState.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                :title="$t('common.delete')"
                class="btn btn-danger btn-xs m-l-5"
                data-original-title="btn btn-danger btn-xs"
                type="button"
                @click.prevent="deleteStockState(stockState)"
              >
                <i class="fa fa-trash-o" />
              </button>
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

export default {
  components: { BaseContainer, BaseDatatable },
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
