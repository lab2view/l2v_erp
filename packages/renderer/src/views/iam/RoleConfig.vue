<template>
  <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('iam.action.listTitle')"
        add-action-router-name="product.form.desc"
        :refresh-action-field="{ page: 1, field: { paginate: 50, next: true } }"
        refresh-action-name="product/getProductsList"
      />
      <div class="card-body p-1">
        <div class="row mb-2">
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="true"
              refresh-action-name="module/getModulesList"
              :with-append="false"
            >
              <BaseSelect
                v-model.number="privilegeFilter.module_id"
                :placeholder="`${$t('common.fields.modules')} ?`"
                :options="modules"
                key-label="name"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md">
            <BaseFieldGroup
              :with-refresh="false"
              :with-append="false"
              :disabled="actions.length === 0"
            >
              <BaseSelect
                v-model.number="privilegeFilter.action_id"
                :placeholder="`${$t('common.headers.sup_module')} ?`"
                :options="actions"
                key-label="label"
                key-value="id"
                :disabled="actions.length === 0"
              />
            </BaseFieldGroup>
          </div>
        </div>

        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="privileges.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.headers.privilege') }}</th>
            <th>{{ $t('common.fields.modules') }}</th>
            <th class="text-center">
              {{ $t('common.headers.role_actions_length') }}
            </th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <RoleConfigTableLine
            v-for="privilege in privileges"
            :key="privilege.id"
            :privilege="privilege"
          />
        </BaseDatatable>
      </div>
    </div>

    <router-view />
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import RoleConfigTableLine from '/@/components/iam/RoleConfigTableLine.vue';

export default {
  name: 'RoleConfig',
  components: {
    RoleConfigTableLine,
    BaseDatatable,
    BaseSelect,
    BaseFieldGroup,
    BaseTableHeader,
    BaseContainer,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('module/getModulesList', { page: 1, field: {} }),
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
      privilegeFilter: {
        module_id: null,
        action_id: null,
      },
    };
  },
  computed: {
    ...mapGetters('module', ['modules']),
    ...mapGetters('role', ['getPrivilegesByFilter']),
    privileges() {
      return this.getPrivilegesByFilter(this.privilegeFilter);
    },
    actions() {
      if (this.privilegeFilter.module_id) {
        return this.privileges
          .filter((privilege) => privilege.action.code.includes('.manage'))
          .map((p) => {
            return {
              id: p.action.id,
              label: p.action.label,
            };
          });
      } else return [];
    },
  },
  watch: {
    privileges() {
      if (!this.$store.state.globalLoading) {
        this.$store.dispatch('setGlobalLoading', true);
        setTimeout(() => this.$store.dispatch('setGlobalLoading', false), 2000);
      }
    },
  },
};
</script>

<style scoped></style>
