<template>
  <BaseContainer :title="`Configurations`">
    <template #breadcrumb>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'dashboard' }">
            <i class="fa fa-home f-18"></i>
          </router-link>
        </li>
        <li class="breadcrumb-item">Config</li>
        <li class="breadcrumb-item active">
          {{ $t(`menu.${$route.meta.code.toString().toLowerCase()}`) }}
        </li>
      </ol>
    </template>
    <template #bookmark>
      <Bookmark :items="bookmarkItems" />
    </template>

    <router-view></router-view>
  </BaseContainer>
</template>

<script>
import Bookmark from '/@/components/layouts/Bookmark.vue';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import { productConfigRoutes } from '../../router/productConfigRoutes';

export default {
  name: 'ConfigurationLayout',
  components: { BaseContainer, Bookmark },
  computed: {
    bookmarkItems() {
      let results = Object.assign([], productConfigRoutes);
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
