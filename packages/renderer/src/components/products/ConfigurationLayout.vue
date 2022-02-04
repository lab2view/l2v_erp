<template>
  <BaseContainer :title="`Configurations`" module="Config">
    <template #bookmark>
      <Bookmark :items="bookmarkItems" />
    </template>

    <router-view></router-view>
  </BaseContainer>
</template>

<script>
import Bookmark from '/@/components/layouts/Bookmark.vue';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import { configRoutes } from '../../router/product/configRoutes';

export default {
  name: 'ConfigurationLayout',
  components: { BaseContainer, Bookmark },
  computed: {
    bookmarkItems() {
      let results = Object.assign([], configRoutes);
      return results.map((productConfigRoute) => {
        return productConfigRoute.meta?.feather
          ? {
              to: productConfigRoute.name,
              code: productConfigRoute.meta.code,
              feather: productConfigRoute.meta.feather,
            }
          : {};
      });
    },
  },
};
</script>

<style scoped></style>
