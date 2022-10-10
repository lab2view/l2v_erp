<template>
  <li v-if="canShowCurrentMenuModule" class="sidebar-main-title">
    <div>
      <h6>{{ $t(`menu.modules.${module.code.toString().toLowerCase()}`) }}</h6>
    </div>
  </li>
  <MenuModuleItem
    v-for="(menu, index) in module.menus"
    :key="`menu-${index}`"
    :menu="menu"
  />
</template>

<script>
import { defineComponent } from 'vue';
import MenuModuleItem from './MenuModuleItem.vue';
import { mapGetters } from 'vuex';
export default defineComponent({
  mame: 'MenuModule',
  components: { MenuModuleItem },
  props: {
    module: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['canShowMenuModule']),
    canShowCurrentMenuModule() {
      return this.canShowMenuModule(this.module.code.toString().toUpperCase());
    },
  },
});
</script>

<style scoped></style>
