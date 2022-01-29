<template>
  <BaseContainer
    :title="$t('enterprise_type.title')"
    :module="$t('menu.enterpriseType.lis')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('enterprise.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'enterprise.form' }"
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
        <BaseDatatable :tfoot="false" :total="enterprises.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.type') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.barcode') }}</th>
            <th>{{ $t('common.attributes.state') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="enterprise in enterprises" :key="enterprise.id">
            <td>{{ enterprise.id }}</td>
            <td>{{ enterprise.enterprise_type.label }}</td>
            <td>{{ enterprise.name }}</td>
            <td>{{ `${enterprise.code} / ${enterprise.reference}` }}</td>
            <td>
              <span
                :class="`badge text-white badge-${
                  enterprise.disabled_at ? 'danger' : 'primary'
                }`"
              >
                {{
                  enterprise.disabled_at
                    ? $t('common.states.disabled')
                    : $t('common.states.enabled')
                }}
              </span>
            </td>
            <td>
              <button
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'enterprise.type.form',
                    params: { id: enterprise.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                v-if="!enterpriseType.not_deletable"
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                data-original-title="btn btn-danger btn-xs"
                :title="$t('common.delete')"
                @click.prevent="deleteEnterpriseType(enterpriseType)"
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
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../../store';
import { mapGetters } from 'vuex';
import BaseContainer from '../../../components/common/BaseContainer.vue';

export default {
  components: { BaseContainer, BaseDatatable },
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
      ...mapGetters('enterpriseTypeConfig', ['enterpriseTypes', 'enterpriseType']),
  },
  created() {
    if (this.enterprise) this.$store.commit('enterprise/SET_CURRENT_ENTERPRISE', null);
  },

  methods: {
    deleteEnterpriseType(enterprise) {
      if (confirm(this.$t('messages.confirmDelete', { label: enterprise.name })))
        this.$store.dispatch('enterprise/deleteEnterpriseType', enterprise.id);
    },
  },
};
</script>

<style scoped></style>
