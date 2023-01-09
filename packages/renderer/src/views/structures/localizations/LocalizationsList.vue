<template>
  <BaseContainer
    :title="$t('enterprise.localisationTitle')"
    :module="$t('enterprise.localizations')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('enterprise.localization.listTitle')"
        add-action-router-name="localization.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="localization/getLocalizationsList"
        entity="Localization"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="localizations.length"
        >
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
              <BaseActionBtnGroup
                entity="Localization"
                :with-show-btn="false"
                @update="
                  $router.push({
                    name: 'localization.form',
                    params: { id: localization.id },
                  })
                "
                @delete="deleteLocalization(localization)"
              />
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
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
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
