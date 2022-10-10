<template>
  <li v-if="canShowModuleSubItem">
    <router-link :to="{ name: menu.to }"
      >{{ $t(`menu.${menu.code?.toString().toLowerCase()}`) }}
    </router-link>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MenuModuleSubItem',
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['canShowMenuItem']),
    canShowModuleSubItem() {
      return this.canShowMenuItem(this.menu.code);
    },
  },
};
</script>

<style scoped></style>
