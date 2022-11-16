<template>
  <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
    <UserTableList
      :update-user-filter="updateUserFilter"
      :user-filter="userFilter"
      :users="users"
    />
    <router-view />
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import UserTableList from '/@/views/iam/UserTableList.vue';

export default {
  name: 'UsersList',
  components: { UserTableList, BaseContainer },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('user/getUsersList', { page: 1, field: {} }),
      store.dispatch('enterprise/getEnterprisesList', { page: 1, field: {} }),
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
      userFilter: {
        enterprise_id: null,
        role_id: null,
        country_id: null,
      },
    };
  },
  computed: {
    ...mapGetters('user', ['getUsersByFilter', 'user']),
    users() {
      return this.getUsersByFilter(this.userFilter);
    },
  },
  watch: {
    users() {
      if (!this.$store.state.globalLoading) {
        this.$store.dispatch('setGlobalLoading', true);
        setTimeout(() => this.$store.dispatch('setGlobalLoading', false), 2000);
      }
    },
  },
  methods: {
    updateUserFilter({ name, value }) {
      this.userFilter[name] = value;
    },
  },
};
</script>

<style scoped></style>
