<template>
  <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
    <UserTableList :users="users" />

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
    ...mapGetters('user', ['users', 'user']),
  },
};
</script>

<style scoped></style>
