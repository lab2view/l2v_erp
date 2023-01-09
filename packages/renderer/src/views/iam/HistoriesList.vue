<template>
  <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
    <h1>Histories</h1>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
// import store from '/@/store';

export default {
  components: { BaseContainer },
  // beforeRouteEnter(routeTo, routeFrom, next) {
  // store
  //   .dispatch('history/getHistoriesList', {
  //     page: 1,
  //     field: {},
  //   })
  //   .then(() => {
  //     next();
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     next();
  //   });
  // },
};
</script>

<style scoped></style>
