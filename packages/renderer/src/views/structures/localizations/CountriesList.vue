<template>
  <BaseContainer
    :module="$t('enterprise.countries')"
    :title="$t('enterprise.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('enterprise.country.listTitle')"
        add-action-router-name="country.activate"
        add-action-label="enterprise.country.activate_country"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="country/getCountriesList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="activeCountries.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.name') }}</th>
            http://localhost:3000/#
            <th>{{ $t('common.attributes.currency') }}</th>
            <th>{{ $t('common.attributes.timezone') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="country in activeCountries" :key="country.id">
            <td>{{ country.id }}</td>
            <td>{{ country.name }}</td>
            <td>{{ country.currency }}</td>
            <td>{{ country.timezone }}</td>
            <td v-if="country.is_active">
              <button
                :title="$t('common.activate')"
                class="btn btn-danger btn-xs m-l-5"
                data-original-title="btn btn-danger btn-xs"
                type="button"
                @click.prevent="deactivateCountry(country)"
              >
                {{ $t('common.deactivate') }}
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
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('country/getCountriesList', {
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
    ...mapGetters('country', ['activeCountries']),
  },
  methods: {
    deactivateCountry(country) {
      if (
        confirm(
          this.$t('messages.confirmDeactivation', { label: country.name })
        )
      ) {
        this.$store.dispatch('country/updateCountry', {
          ...country,
          is_active: false,
        });
      }
    },
  },
};
</script>

<style scoped></style>
