<template>
  <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('iam.role.listTitle')"
        add-action-router-name="iam.role.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="role/getRolesList"
        entity="Role"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="roles.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.description') }}</th>
            <th style="width: 220px">{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.id }}</td>
            <td>{{ role.label }}</td>
            <td>{{ truncate(role.description) }}</td>
            <td>
              <BaseActionBtnGroup
                entity="Role"
                :with-show-btn="false"
                :with-delete-btn="!role.not_deletable"
                @update="
                  $router.push({
                    name: 'iam.role.form',
                    params: { id: role.id },
                  })
                "
                @delete="deleteRole(role)"
              >
                <BaseButton
                  v-if="
                    canConfigure &&
                    (!role.not_deletable || role.privileges.length)
                  "
                  class="btn btn-success btn-xs"
                  data-original-title="btn btn-success btn-xs"
                  type="button"
                  :text="$t('common.configure')"
                  @click.prevent="
                    $router.push({
                      name: 'iam.config.role',
                      params: { id: role.id },
                    })
                  "
                />
              </BaseActionBtnGroup>
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
import BaseContainer from '../../components/common/BaseContainer.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: {
    BaseButton,
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('role/getRolesList', {
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
    ...mapGetters('role', ['roles', 'role']),
    ...mapGetters('auth', ['isGrantedAction']),
    canConfigure() {
      return this.isGrantedAction('Privilege.create');
    },
  },
  created() {
    if (this.role) this.$store.commit('role/SET_CURRENT_ROLE', null);
  },
  methods: {
    truncate(source, size = 100) {
      if (!source) {
        return '';
      }
      return source.length > size ? source.slice(0, size - 1) + '…' : source;
    },
    deleteRole(role) {
      if (confirm(this.$t('messages.confirmDelete', { label: role.name })))
        this.$store.dispatch('role/deleteRole', role.id);
    },
  },
};
</script>

<style scoped></style>
