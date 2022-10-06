<template>
  <li class="sidebar-main-title">
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
export default defineComponent({
  mame: 'MenuModule',
  components: { MenuModuleItem },
  props: {
    module: {
      type: Object,
      required: true,
    },
  },
  computed: {},
});
</script>

<style scoped></style>
