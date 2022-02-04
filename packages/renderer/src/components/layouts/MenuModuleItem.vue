<template>
  <li class="dropdown">
    <a :class="linkClass" class="nav-link menu-title" href="javascript:void(0)">
      <i :data-feather="menu.icon"></i
      ><span>{{
        menu.label ?? $t(`menu.${menu.code?.toString().toLowerCase()}`)
      }}</span>
      <div v-if="haveSubMenus" class="according-menu">
        <i v-if="isCurrentRoute" class="fa fa-angle-down"></i>
        <i v-else class="fa fa-angle-right"></i>
      </div>
    </a>
    <ul
      v-if="menu.items.length > 0"
      :style="subMenuStyle"
      class="nav-submenu menu-content"
    >
      <li v-for="(item, indexItem) in menu.items" :key="`submenu-${indexItem}`">
        <router-link :to="{ name: item.to }"
          >{{ $t(`menu.${item.code?.toString().toLowerCase()}`) }}
        </router-link>
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
      console.log(this.menu.prefix);
      console.log(this.$route.name);
      console.log(RegExp(`^${this.menu.prefix}*`).test(this.$route.name));
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
