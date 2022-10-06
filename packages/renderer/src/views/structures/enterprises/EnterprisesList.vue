<template>
  <BaseContainer
    :module="$t('menu.modules.enterprise')"
    :title="$t('enterprise.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('enterprise.enterprise.listTitle')"
        add-action-router-name="enterprise.form.desc"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="enterprise/getEnterprisesList"
      />
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="enterprises.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.enterpriseType') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.email') }}</th>
            <th>{{ $t('common.attributes.phone') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="enterprise in enterprises" :key="enterprise.id">
            <td>{{ enterprise.id }}</td>
            <td>{{ enterprise.enterprise_type.label }}</td>
            <td>{{ enterprise.name }}</td>
            <td>{{ enterprise.email }}</td>
            <td>{{ enterprise.phone }}</td>
            <td>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'enterprise.form.desc',
                    params: { id: enterprise.id },
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
                @click.prevent="deleteEnterprise(enterprise)"
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
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../../store';
import { mapGetters } from 'vuex';
import BaseContainer from '../../../components/common/BaseContainer.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  name: 'EnterprisesList',
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('enterprise/getEnterprisesList', {
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
    ...mapGetters('enterprise', ['enterprises', 'enterprise']),
  },
  created() {
    if (this.enterprise)
      this.$store.commit('enterprise/SET_CURRENT_ENTERPRISE', null);
  },

  methods: {
    deleteEnterprise(enterprise) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: enterprise.name }))
      )
        this.$store.dispatch('enterprise/deleteEnterprise', enterprise.id);
    },
  },
};
</script>

<style scoped></style>
