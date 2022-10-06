<template>
  <UserTableList :users="users" :query="{ enterprise_id: enterprise.id }" />
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store/index.js';
import UserTableList from '/@/views/iam/UserTableList.vue';
export default {
  name: 'EnterpriseIAM',
  components: { UserTableList },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('user/getUsersList', {
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
    ...mapGetters('enterprise', ['enterprise']),
    ...mapGetters('user', ['getUserByEnterpriseId']),
    users() {
      return this.getUserByEnterpriseId(this.enterprise.id);
    },
  },
};
</script>

<style scoped></style>
