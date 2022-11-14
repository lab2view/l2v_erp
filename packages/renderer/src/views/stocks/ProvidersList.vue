<template>
  <BaseContainer
    :module="$t('menu.modules.stocks')"
    :title="$t('stocks.title')"
  >
    <div class="card">
      <BaseTableHeader
        :refresh-action-field="{ page: 1, field: { next: true } }"
        :title="$t('stocks.provider.listTitle')"
        add-action-router-name="provider.form"
        refresh-action-name="provider/getStockProvidersList"
      />
      <div class="card-body">
        <div class="row mb-2">
          <div class="col-md-3">
            <BaseFieldGroup
              :with-append="false"
              :with-refresh="true"
              refresh-action-name="country/getCountriesList"
            >
              <BaseSelect
                v-model.number="providerFilter.country_id"
                :options="countries"
                :placeholder="`${$t('common.attributes.country')} ?`"
                key-label="name"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
        </div>
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="providers.length"
        >
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
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';

export default {
  name: 'ProvidersList',
  components: {
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
    BaseSelect,
    BaseFieldGroup,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('provider/getStockProvidersList', {
        page: 1,
        field: {},
      }),
      store.dispatch('country/getCountriesList', {
        page: 1,
        field: {},
      }),
    ])
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  data() {
    return {
      providerFilter: {
        country_id: null,
      },
    };
  },
  computed: {
    ...mapGetters('provider', ['getProvidersByFilter', 'provider']),
    ...mapGetters('country', ['countries']),
    providers() {
      return this.getProvidersByFilter(this.providerFilter);
    },
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
