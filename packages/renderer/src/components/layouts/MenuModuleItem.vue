<template>
  <li v-if="canShowModuleItem" class="dropdown">
    <a
      v-if="haveSubMenus"
      :class="linkClass"
      class="nav-link menu-title"
      href="javascript:void(0)"
    >
      <i :data-feather="menu.icon"></i
      ><span>{{
        menu.label ?? $t(`menu.${menu.code?.toString().toLowerCase()}`)
      }}</span>
      <div class="according-menu">
        <i v-if="isCurrentRoute" class="fa fa-angle-down"></i>
        <i v-else class="fa fa-angle-right"></i>
      </div>
    </a>
    <router-link
      v-else
      :class="linkClass"
      class="nav-link menu-title"
      :to="{ name: menu.to }"
    >
      <i :data-feather="menu.icon"></i
      ><span>{{
        menu.label ?? $t(`menu.${menu.code?.toString().toLowerCase()}`)
      }}</span>
    </router-link>
    <ul
      v-if="haveSubMenus"
      :style="subMenuStyle"
      class="nav-submenu menu-content"
    >
      <MenuModuleSubItem
        v-for="(item, indexItem) in menu.items"
        :key="`submenu-${indexItem}`"
        :menu="item"
      />
    </ul>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';
import MenuModuleSubItem from '/@/components/layouts/MenuModuleSubItem.vue';

export default {
  name: 'MenuModuleItem',
  components: { MenuModuleSubItem },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['canShowMenuItem']),
    canShowModuleItem() {
      return this.canShowMenuItem(this.menu.code);
    },
    isCurrentRoute() {
      return RegExp(`^${this.menu.prefix}*`).test(this.$route.name);
    },
    haveSubMenus() {
      return !!this.menu.items?.length;
    },
    linkClass() {
      return (
        (this.isCurrentRoute ? 'active ' : '') +
        (this.haveSubMenus ? '' : ' link-nav')
      );
    },
    subMenuStyle() {
      return this.isCurrentRoute ? 'display: block;' : 'display: none;';
    },
  },
  mounted() {
    setTimeout(() => window.feather?.replace(), 500);
  },
};
</script>

<style scoped></style>
