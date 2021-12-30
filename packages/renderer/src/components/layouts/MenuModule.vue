<template>
  <li class="sidebar-main-title">
    <div>
      <h6>{{ module.name }}</h6>
    </div>
  </li>
  <li v-for="(menu, index) in module.menus" :key="index" class="dropdown">
    <a
      class="nav-link menu-title"
      :class="menu.items.length === 0 ? 'link-nav' : ''"
      href="javascript:void(0)"
    >
      <i :data-feather="menu.icon"></i><span>{{ menu.label }}</span>
    </a>
    <ul v-if="menu.items.length > 0" class="nav-submenu menu-content">
      <li v-for="(item, indexItem) in menu.items" :key="indexItem">
        <a href="#">{{ item.label }}</a>
      </li>
    </ul>
  </li>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
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
