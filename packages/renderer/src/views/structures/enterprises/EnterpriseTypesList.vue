<template>
  <BaseContainer
    :title="$t('enterprise.title')"
    :module="$t('enterprise.configurations')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('enterprise.enterpriseType.listTitle')"
        add-action-router-name="types.enterprise.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="enterprise_type/getEnterpriseTypesList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="enterpriseTypes.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.description') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr
            v-for="enterpriseType in enterpriseTypes"
            :key="enterpriseType.id"
          >
            <td>{{ enterpriseType.id }}</td>
            <td>{{ enterpriseType.label }}</td>
            <td>{{ truncate(enterpriseType.description) }}</td>
            <td>
              <BaseActionBtnGroup
                entity="EnterpriseType"
                :with-show-btn="false"
                @update="
                  $router.push({
                    name: 'types.enterprise.form',
                    params: { id: enterpriseType.id },
                  })
                "
                @delete="deleteEnterpriseType(enterpriseType)"
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
  name: 'EnterpriseTypesList',
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('enterprise_type/getEnterpriseTypesList', {
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
    ...mapGetters('enterprise_type', ['enterpriseTypes', 'enterpriseType']),
  },
  created() {
    if (this.enterpriseType)
      this.$store.commit('enterprise_type/SET_CURRENT_ENTERPRISE_TYPE', null);
  },

  methods: {
    truncate(source, size = 100) {
      if (!source) {
        return '';
      }
      return source.length > size ? source.slice(0, size - 1) + '…' : source;
    },
    deleteEnterpriseType(enterpriseType) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: enterpriseType.label })
        )
      )
        this.$store.dispatch(
          'enterprise_type/deleteEnterpriseType',
          enterpriseType.id
        );
    },
  },
};
</script>

<style scoped></style>
