<template>
<!--  <app-navigation />
  <a href="#Douala" class="nav-link menu-title active">Hallo</a>
  <div class="custom-scrollbar">scroll</div>
  <router-view />-->
  <!-- Loader starts-->
  <Loader/>
  <!-- Loader ends-->
  <!-- page-wrapper Start-->
  <Page/>
</template>

<script>
import {defineComponent} from 'vue';
import AppNavigation from '/@/components/AppNavigation.vue';
import Loader from '/@/components/Loader.vue';
import Page from '/@/components/layouts/Page.vue';

export default defineComponent({
  name: 'App',
  components: {
    Page,
    Loader,
    AppNavigation,
  },

  created() {
    setTimeout(() => {
      (async () => {
        await this.$loadScript(`../assets/js/jquery-3.5.1.min.js`);
        await this.$loadScript(`../assets/js/icons/feather-icon/feather.min.js`);
        await this.$loadScript(`../assets/js/icons/feather-icon/feather-icon.js`);
        await this.$loadScript(`../assets/js/sidebar-menu.js`);
        await this.$loadScript(`../assets/js/config.js`);
        await this.$loadScript(`../assets/js/bootstrap/popper.min.js`);
        await this.$loadScript(`../assets/js/bootstrap/bootstrap.min.js`);
        await this.$loadScript(`../assets/js/prism/prism.min.js`);
        await this.$loadScript(`../assets/js/clipboard/clipboard.min.js`);
        await this.$loadScript(`../assets/js/tooltip-init.js`);
        await this.$loadScript(`../assets/js/script.js`);
        await this.$loadScript(`../assets/js/theme-customizer/customizer.js`);
      })();
    }, 1000)
  }
});
</script>

<style>
</style>
