<template>
  <li class="dropdown">
    <a class="nav-link menu-title" :class="linkClass" href="javascript:void(0)">
      <i :data-feather="menu.icon"></i><span>{{ menu.label }}</span>
      <div v-if="haveSubMenus" class="according-menu">
        <i v-if="isCurrentRoute" class="fa fa-angle-down"></i>
        <i v-else class="fa fa-angle-right"></i>
      </div>
    </a>
    <ul
      v-if="menu.items.length > 0"
      class="nav-submenu menu-content"
      :style="subMenuStyle"
    >
      <li v-for="(item, indexItem) in menu.items" :key="`submenu-${indexItem}`">
        <router-link :to="{ name: item.to }">{{ item.label }}</router-link>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'MenuModuleItem',
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  computed: {
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
};
</script>

<style scoped></style>
