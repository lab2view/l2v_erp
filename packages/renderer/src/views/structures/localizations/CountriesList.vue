<template>
  <BaseContainer
    :module="$t('structures.countries')"
    :title="$t('structures.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('structures.country.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'country.activate' }"
              class="btn btn-primary"
              href="#"
              type="button"
            >
              <i class="fa fa-pencil m-r-5" />
              {{ $t('structures.country.activate_country') }}
            </router-link>
            <!--
                      <div class="col-sm-auto align-items-end">
                        <router-link
                          :to="{ name: 'country.form' }"
                          href="#"
                          class="btn btn-primary"
                          type="button"
                        >
                          <i class="fa fa-plus m-r-5" />
                          {{ $t('common.add') }}
                        </router-link>
            -->
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="countries.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.iso') }}</th>
            <th>{{ $t('common.attributes.calling_code') }}</th>
            <th>{{ $t('common.attributes.currency_name') }}</th>
            <th>{{ $t('common.attributes.currency') }}</th>
            <th>{{ $t('common.attributes.currency_symbol') }}</th>
            <th>{{ $t('common.attributes.phone_length') }}</th>
            <th>{{ $t('common.attributes.timezone') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="country in countries" :key="country.id">
            <td>{{ country.id }}</td>
            <td>{{ country.name }}</td>
            <td>
              {{
                (country.iso_3166_2 ?? 'none') +
                ' ' +
                (country.iso_3166_3 ?? 'none')
              }}
            </td>
            <td>{{ country.calling_code }}</td>
            <td>{{ country.currency_name }}</td>
            <td>{{ country.currency }}</td>
            <td>{{ country.currency_symbol }}</td>
            <td>{{ country.phone_length }}</td>
            <td>{{ country.timezone }}</td>
            <td>
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

export default {
  components: { BaseContainer, BaseDatatable },
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
    ...mapGetters('country', ['countries']),
  },
  methods: {
    deactivateCountry(country) {
      if (
        confirm(
          this.$t('messages.confirmDeactivation', { label: country.name })
        )
      ) {
        country.is_active = false;
        this.$store.dispatch('country/updateCountry', country);
      }
    },
  },
};
</script>

<style scoped></style>
