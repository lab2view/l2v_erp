<template>
  <div class="card">
    <BaseTableHeader
      :query="query"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      :title="$t('iam.user.listTitle')"
      add-action-router-name="iam.user.form.desc"
      refresh-action-name="user/getUsersList"
      entity="User"
    />
    <div class="card-body">
      <div v-if="canMakeFilter" class="row mb-2">
        <div v-if="!query" class="col-md-3">
          <BaseFieldGroup
            :with-append="false"
            :with-refresh="true"
            refresh-action-name="enterprise/getEnterprisesList"
          >
            <BaseSelect
              v-model.number="enterpriseId"
              :options="enterprises"
              :placeholder="`${$t('common.attributes.structure')} ?`"
              key-label="name"
              key-value="id"
            />
          </BaseFieldGroup>
        </div>
        <div class="col-md-3">
          <BaseFieldGroup
            :with-append="false"
            :with-refresh="true"
            refresh-action-name="enterprise/getEnterprisesList"
          >
            <BaseSelect
              v-model.number="countryId"
              :options="countries"
              :placeholder="`${$t('common.attributes.country')} ?`"
              key-label="name"
              key-value="id"
            />
          </BaseFieldGroup>
        </div>
        <div class="col-md-3">
          <BaseFieldGroup
            :with-append="false"
            :with-refresh="true"
            refresh-action-name="enterprise/getEnterprisesList"
          >
            <BaseSelect
              v-model.number="roleId"
              :options="roles"
              :placeholder="`${$t('common.attributes.role')} ?`"
              key-label="label"
              key-value="id"
            />
          </BaseFieldGroup>
        </div>
      </div>
      <BaseDatatable
        v-if="!$store.state.globalLoading"
        :tfoot="false"
        :total="users?.length"
      >
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.structure') }}</th>
          <th>{{ $t('common.attributes.role') }}</th>
          <th>{{ $t('common.attributes.name') }}</th>
          <th>{{ $t('common.attributes.email') }}</th>
          <th>{{ $t('common.attributes.phone') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.enterprise?.name ?? 'Principale' }}</td>
          <td>{{ user.role.label }}</td>
          <td>{{ `${user.first_name ?? ''} ${user.last_name ?? ''}` }}</td>
          <td>
            <b>{{ user.email }}</b>
          </td>
          <td>{{ user.phone }}</td>
          <td>
            <BaseActionBtnGroup
              entity="User"
              :with-show-btn="false"
              @update="
                $router.push({
                  name: 'iam.user.form.desc',
                  params: { id: user.id },
                  query,
                })
              "
              @delete="deleteUser(user)"
            />
          </td>
        </tr>
      </BaseDatatable>
    </div>
  </div>
</template>

<script>
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import { mapGetters } from 'vuex';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'UserTableList',
  components: {
    BaseActionBtnGroup,
    BaseButton,
    BaseDatatable,
    BaseTableHeader,
    BaseSelect,
    BaseFieldGroup,
  },
  props: {
    users: {
      type: Array,
      default: null,
    },
    query: {
      type: Object,
      default: null,
    },
    userFilter: {
      type: Object,
      default: null,
    },
    updateUserFilter: {
      type: Function,
      default: null,
    },
  },

  computed: {
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('role', ['roles']),
    ...mapGetters('country', ['countries']),
    canMakeFilter() {
      return !!this.userFilter && !!this.updateUserFilter;
    },
    enterpriseId: {
      get() {
        return this.userFilter?.enterprise_id;
      },
      set(value) {
        if (this.updateUserFilter)
          this.updateUserFilter({ name: 'enterprise_id', value: value });
      },
    },
    countryId: {
      get() {
        return this.userFilter?.country_id;
      },
      set(value) {
        if (this.updateUserFilter)
          this.updateUserFilter({ name: 'country_id', value: value });
      },
    },
    roleId: {
      get() {
        return this.userFilter?.role_id;
      },
      set(value) {
        if (this.updateUserFilter)
          this.updateUserFilter({ name: 'role_id', value: value });
      },
    },
  },

  methods: {
    deleteUser(user) {
      if (confirm(this.$t('messages.confirmDelete', { label: user.name })))
        this.$store.dispatch('user/deleteUser', user.id);
    },
  },
};
</script>

<style scoped></style>
