<template>
  <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
    <div class="card">
      <BaseTableHeader
        :title="`${role.label} : ${$t('iam.action.listTitle')}`"
        :refresh-action-field="{ page: 1, field: { paginate: 50, next: true } }"
        refresh-action-name="role/getRolesList"
      />
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
                v-for="module in modules"
                :id="`v-pills-${module.id}-tab`"
                :key="`v-pills-${module.id}-tab`"
                class="nav-link p-b-20 p-t-20 border-bottom border-bottom-primary"
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
                v-for="module in modules"
                :key="`v-pills-${module.id}`"
                :module="module"
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
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import { mapGetters } from 'vuex';
import ModuleActionList from '/@/components/iam/ModuleActionList.vue';

export default {
  name: 'RoleConfig',
  components: {
    ModuleActionList,
    BaseTableHeader,
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
  computed: {
    ...mapGetters('module', ['modules']),
    ...mapGetters('role', ['role']),
  },
};
</script>

<style scoped></style>
