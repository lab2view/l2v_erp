<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('iam.user.listTitle')"
      add-action-router-name="iam.user.form.desc"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="user/getUsersList"
      :query="query"
    />
    <div class="card-body">
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
            <BaseButton
              type="button"
              class="btn btn-secondary btn-xs"
              :text="$t('common.update')"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'iam.user.form.desc',
                  params: { id: user.id },
                  query,
                })
              "
            />
            <BaseButton
              :title="$t('common.delete')"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              @click.prevent="deleteUser(user)"
            >
              <i class="fa fa-trash-o" />
            </BaseButton>
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
export default {
  name: 'UserTableList',
  components: { BaseButton, BaseDatatable, BaseTableHeader },
  props: {
    users: {
      type: Array,
      default: null,
    },
    query: {
      type: Object,
      default: null,
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
