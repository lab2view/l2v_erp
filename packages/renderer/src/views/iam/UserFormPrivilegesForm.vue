<template>
  <ActionSelectableList
    :used-actions="[]"
    :submit-store-action="submitAddActionsToUserForm"
  >
    <div class="card-header pb-2">
      <h5>{{ $t('iam.privilege.formCreateTitle') }}</h5>
    </div>
  </ActionSelectableList>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store';
import ActionSelectableList from '/@/components/iam/ActionSelectableList.vue';

export default {
  components: { ActionSelectableList },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('user/getUsersList', {
        page: 1,
        field: {},
      }),
      store.dispatch('role/getActionsList', {
        page: 1,
        field: {},
      }),
      store.dispatch('module/getModulesList', {
        page: 1,
        field: {},
      }),
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
    ...mapGetters('role', ['role']),
    ...mapGetters('user', ['users', 'user']),
    title() {
      return this.role && this.role.id
        ? this.$t('iam.privilege.formUpdateTitle')
        : this.$t('iam.privilege.formCreateTitle');
    },
  },
  methods: {
    submitAddActionsToUserForm(selected) {
      return this.$store.dispatch('user/addUserPrivileges', {
        actions: selected,
      });
    },
  },
};
</script>

<style scoped></style>
