<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stock.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('stock.provider.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'provider.form' }"
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
        Providers
        <br>
        {{  stock_providers.length }}
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
      .dispatch('stock_provider/getStockProvidersList', {
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
    ...mapGetters('stock_provider', ['stock_providers', 'stockProvider']),
  },
  created() {
    if (this.provider)
      this.$store.commit('stock_provider/SET_CURRENT_STOCK_PROVIDER', null);
  },

  methods: {
    deleteProvider(provider) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: provider.label })
        )
      )
        this.$store.dispatch(
          'stock_provider/deleteProvider',
          provider.id
        );
    },
  },
};
</script>

<style scoped></style>
