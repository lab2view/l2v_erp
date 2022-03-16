<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('stocks.provider.listTitle') }}</h5>
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
        <BaseDatatable :tfoot="false" :total="stock_providers.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.country') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.phone') }}</th>
            <th>{{ $t('common.attributes.email') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="provider in stock_providers" :key="provider.id">
            <td>{{ provider.id }}</td>
            <td>{{ provider.country.name }}</td>
            <td>{{ provider.name }}</td>
            <td>{{ provider.phone }}</td>
            <td>{{ provider.email }}</td>
            <td>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'provider.form',
                    params: { id: provider.id },
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
                @click.prevent="deleteProvider(provider)"
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
          'stock_provider/deleteStockProvider',
          provider.id
        );
    },
  },
};
</script>

<style scoped></style>
