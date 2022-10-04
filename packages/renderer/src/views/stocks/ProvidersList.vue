<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('stocks.provider.listTitle')"
        add-action-router-name="provider.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="provider/getStockProvidersList"
      />
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="providers.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.country') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.phone') }}</th>
            <th>{{ $t('common.attributes.email') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="provider in providers" :key="provider.id">
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
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('provider/getStockProvidersList', {
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
    ...mapGetters('provider', ['providers', 'provider']),
  },
  created() {
    if (this.provider)
      this.$store.commit('provider/SET_CURRENT_PROVIDER', null);
  },

  methods: {
    deleteProvider(provider) {
      if (confirm(this.$t('messages.confirmDelete', { label: provider.label })))
        this.$store.dispatch('provider/deleteStockProvider', provider.id);
    },
  },
};
</script>

<style scoped></style>
