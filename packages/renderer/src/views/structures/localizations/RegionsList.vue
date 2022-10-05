<template>
  <BaseContainer
    :title="$t('enterprise.title')"
    :module="$t('enterprise.regions')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('enterprise.region.listTitle')"
        add-action-router-name="region.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="region/getRegionsList"
      />
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="regions.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.country') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="region in regions" :key="region.id">
            <td>{{ region.id }}</td>
            <td>{{ region.country.name }}</td>
            <td>{{ region.name }}</td>
            <td>
              <button
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'region.form',
                    params: { id: region.id },
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
                @click.prevent="deleteRegion(region)"
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
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('region/getRegionsList', {
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
    ...mapGetters('region', ['regions', 'region']),
  },
  created() {
    if (this.region && this.region.id)
      this.$store.commit('region/SET_CURRENT_REGION', null);
  },
  methods: {
    deleteRegion(region) {
      if (
        confirm(this.$t('messages.confirmDeactivation', { label: region.name }))
      )
        this.$store.dispatch('region/deleteRegion', region.id);
    },
  },
};
</script>

<style scoped></style>
