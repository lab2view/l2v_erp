<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stock.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('stock.stockExit.listTitle') }}</h5>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="stock_exits.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.stock_type') }}</th>
            <th>{{ $t('common.attributes.enterprise') }}</th>
            <th>{{ $t('common.attributes.receiver_structure') }}</th>
            <th>{{ $t('common.attributes.cashier') }}</th>
            <th>{{ $t('common.attributes.reference') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="stockExit in stock_exits" :key="stockExit.id">
            <td>{{ stockExit.id }}</td>
            <td>{{ stockExit.stock_type?.label }}</td>
            <td>{{ stockExit.enterprise?.name }}</td>
            <td>{{ stockExit.enterprise_receiver?.name }}</td>
            <td>{{ stockExit.cashier?.name }}</td>
            <td>{{ stockExit.reference }}</td>
            <td>
              <button
                :title="$t('common.delete')"
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
        <br />
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
      .dispatch('stock_exit/getStockExitsList', {
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
    ...mapGetters('stock_exit', ['stock_exits', 'stockExit']),
  },
  created() {
    if (this.stockExit)
      this.$store.commit('stock_exit/SET_CURRENT_STOCK_EXIT', null);
  },

  methods: {
    deleteStockExit(stockExit) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: stockExit.reference })
        )
      )
        this.$store.dispatch(
          'stock_exit/deleteStockExit',
          stockExit.id
        );
    },
  },
};
</script>

<style scoped></style>
