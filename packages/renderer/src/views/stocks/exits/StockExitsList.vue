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
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'config.stocks.exit.form' }"
              class="btn btn-primary"
              href="#"
              exit="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        {{ stock_exits.length }}
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: { BaseContainer },
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
    truncate(source, size = 100) {
      if (!source) {
        return '';
      }
      return source.length > size ? source.slice(0, size - 1) + '…' : source;
    },
    deleteStockExit(stockExit) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: stockExit.label })
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
