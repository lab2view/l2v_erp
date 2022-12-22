<template>
  <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
    <div class="card">
      <BaseTableHeader
        :title="`${role.label} : ${$t('iam.action.listTitle')}`"
        add-action-router-name="product.form.desc"
        :refresh-action-field="{ page: 1, field: { paginate: 50, next: true } }"
        refresh-action-name="role/getRolesList"
      />
      <div class="card-body p-t-20 p-1">
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
          <div class="col-md">
            <BaseButton
              type="button"
              class="btn btn-outline-danger btn-sm m-r-5"
              :disabled="!isSelected"
              icon="fa fa-trash-o"
              :text="$t('common.delete_all')"
              :loading="loading"
              @click.prevent="deleteSelectedPrivilege"
            />
          </div>
        </div>

        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="privileges.length"
        >
          <template #headers>
            <th :title="$t('common.select_all')" class="text-start w-auto">
              <div
                class="checkbox"
                :class="
                  partialSelect ? 'checkbox-solid-success' : 'checkbox-primary'
                "
              >
                <input
                  id="checkbox-select-all"
                  v-model="selectAll"
                  type="checkbox"
                  style="height: 10px"
                />
                <label
                  class="m-0 f-w-700 p-l-5"
                  for="checkbox-select-all"
                  :title="$t('common.select_all')"
                >
                  {{
                    `${$t('common.select_all')} / ${$t(
                      'iam.privilege.listTitle'
                    )}`
                  }}</label
                >
              </div>
            </th>
            <th>{{ $t('common.fields.modules') }}</th>
            <th class="text-center" style="width: 120px">
              {{ $t('common.actions') }}
            </th>
          </template>
          <RoleConfigTableLine
            v-for="privilege in privileges"
            :key="privilege.id"
            :privilege="privilege"
            :selected-list="selected"
            @selected="selectPrivilege(privilege, true)"
            @unselected="selectPrivilege(privilege, false)"
            @deleted="resetDatatable"
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
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'RoleConfig',
  components: {
    BaseButton,
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
      loading: false,
      privilegeFilter: {
        module_id: null,
        action_id: null,
      },
      selected: [],
    };
  },
  computed: {
    ...mapGetters('module', ['modules']),
    ...mapGetters('role', ['role', 'getPrivilegesByFilter']),
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
    isSelected() {
      return this.selected.length > 0;
    },
    partialSelect() {
      return this.isSelected && this.selected.length < this.privileges.length;
    },
    selectedAllArticle() {
      if (this.privileges.length)
        return this.selected.length === this.privileges.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllArticle;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.privileges.forEach((p) => result.push({ id: p.id }));
          this.selected = result;
        }
      },
    },
  },
  watch: {
    privileges() {
      this.resetDatatable();
    },
  },
  methods: {
    resetDatatable() {
      if (!this.$store.state.globalLoading) {
        this.$store.dispatch('setGlobalLoading', true);
        setTimeout(() => this.$store.dispatch('setGlobalLoading', false), 2000);
      }
    },
    selectPrivilege(privilege, adding) {
      if (adding) this.selected.push(privilege.id);
      else this.selected = this.selected.filter((s) => s !== privilege.id);
    },

    deleteSelectedPrivilege() {
      if (
        !this.$store.state.globalLoading &&
        this.selected.length &&
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.$t('common.deleted_selection'),
          })
        )
      ) {
        this.$store.dispatch('setGlobalLoading', true);
        this.$store
          .dispatch('role/removeRolePrivileges', this.selected)
          .then(() => (this.selected = []))
          .finally(() => this.$store.dispatch('setGlobalLoading', false));
      }
    },
  },
};
</script>

<style scoped></style>
