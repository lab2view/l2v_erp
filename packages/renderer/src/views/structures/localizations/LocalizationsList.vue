<template>
  <BaseContainer
    :title="$t('structures.localisationTitle')"
    :module="$t('structures.localizations')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('structures.localization.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'localization.form' }"
              href="#"
              class="btn btn-primary"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="localizations.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.country') }}</th>
            <th>{{ $t('common.attributes.region') }}</th>
            <th>{{ $t('common.attributes.city') }}</th>
            <th>{{ $t('common.attributes.address') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="localization in localizations" :key="localization.id">
            <td>{{ localization.id }}</td>
            <td>{{ localization.country.name }}</td>
            <td>{{ localization.region.name }}</td>
            <td>{{ localization.city }}</td>
            <td>{{ localization.address }}</td>
            <td>
              <button
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'localization.form',
                    params: { id: localization.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                data-original-title="btn btn-danger btn-xs"
                :title="$t('common.delete')"
                @click.prevent="deleteLocalization(localization)"
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
      .dispatch('localization/getLocalizationsList', {
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
    ...mapGetters('localization', ['localizations', 'localization']),
  },
  created() {
    if (this.localization && this.localization.id)
      this.$store.commit('localization/SET_CURRENT_LOCALIZATION', null);
  },

  methods: {
    deleteLocalization(localization) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: localization.address })
        )
      )
        this.$store.dispatch(
          'localization/deleteLocalization',
          localization.id
        );
    },
  },
};
</script>

<style scoped></style>
