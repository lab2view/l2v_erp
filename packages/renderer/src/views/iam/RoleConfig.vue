<template>
  <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
    <div class="card">
      <div class="card-header pt-2 pb-1 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h6>
              {{ $t('iam.privilege.granted_list', { role: role.label }) }}
            </h6>
          </div>
          <div class="col-auto">
            <BaseButton
              type="button"
              class="btn btn-sm btn-success"
              icon="fa fa-save"
              :disabled="!canSaveModification"
              :loading="loading"
              :text="$t('common.save_update')"
              @click.prevent="handlePrivilegeForm"
            />
          </div>
        </div>
      </div>
      <div class="card-body p-1">
        <div class="row">
          <div class="col-sm-3 tabs-responsive-side">
            <div
              id="v-pills-tab"
              class="nav flex-column nav-pills border-tab nav-left shadow-sm"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                v-for="(module, index) in modules"
                :id="`v-pills-${module.id}-tab`"
                :key="`v-pills-${module.id}-tab`"
                class="nav-link p-b-20 p-t-20 border-bottom border-bottom-primary"
                :class="index === 0 ? 'active' : ''"
                data-bs-toggle="pill"
                :href="`#v-pills-${module.id}`"
                role="tab"
                :aria-controls="`v-pills-${module.id}`"
                aria-selected="false"
              >
                {{ module.name }}
              </a>
            </div>
          </div>
          <div class="col-sm-9">
            <div id="v-pills-tabContent" class="tab-content">
              <ModuleActionList
                v-for="(module, ind) in modules"
                :key="`v-pills-${module.id}`"
                :module="module"
                :open="ind === 0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import ModuleActionList from '/@/components/iam/ModuleActionList.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'RoleConfig',
  components: {
    BaseButton,
    ModuleActionList,
    BaseContainer,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('module/getModulesList', { page: 1, field: {} }),
      store.dispatch('role/getActionsList', { page: 1, field: {} }),
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
    };
  },
  computed: {
    ...mapGetters('module', ['modules']),
    ...mapGetters('role', [
      'role',
      'currentRoleActionToAdd',
      'currentRoleActionToRemove',
    ]),
    canSaveModification() {
      return (
        this.currentRoleActionToAdd.length ||
        this.currentRoleActionToRemove.length
      );
    },
  },
  methods: {
    handlePrivilegeForm() {
      if (this.loading) return;

      if (confirm(this.$t('messages.validatePrivilege'))) {
        this.loading = true;

        if (
          this.currentRoleActionToAdd.length > 0 &&
          this.currentRoleActionToRemove.length > 0
        ) {
          Promise.all([
            this.$store.dispatch('role/addRolePrivileges', {
              privileges: this.currentRoleActionToAdd,
            }),
            this.$store.dispatch(
              'role/removeRolePrivileges',
              this.currentRoleActionToRemove
            ),
          ]).finally(() => (this.loading = false));
        } else if (this.currentRoleActionToAdd.length > 0) {
          this.$store
            .dispatch('role/addRolePrivileges', {
              privileges: this.currentRoleActionToAdd,
            })
            .finally(() => (this.loading = false));
        } else {
          this.$store
            .dispatch(
              'role/removeRolePrivileges',
              this.currentRoleActionToRemove
            )
            .finally(() => (this.loading = false));
        }
      }
    },
  },
};
</script>

<style scoped></style>
