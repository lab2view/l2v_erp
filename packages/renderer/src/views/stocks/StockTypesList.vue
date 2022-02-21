<template>
  <BaseContainer :module="$t('menu.modules.stocks')" :title="$t('stock.title')">
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('stock.stockType.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'config.stocks.type.form' }"
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
        <BaseDatatable :tfoot="false" :total="stock_types.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.stock_type') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="stockType in stock_types" :key="stockType.id">
            <td>{{ stockType.id }}</td>
            <td>{{ stockType.label }}</td>
            <td>
              {{
                stockType.type_for
                  ? $t(`stock.${stockType.type_for.toLowerCase()}`)
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
                    name: 'config.stocks.type.form',
                    params: { id: stockType.id },
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
                @click.prevent="deleteStockType(stockType)"
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
