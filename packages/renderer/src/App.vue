<template>
  <!--Loader starts-->
  <Loader />
  <!-- Loader ends-->
  <!-- page-wrapper Start-->
  <router-view />
  <!-- page-wrapper ends-->
</template>

<script>
import { defineComponent } from 'vue';
import Loader from '/@/components/Loader.vue';

export default defineComponent({
  name: 'App',
  components: {
    Loader,
  },

  mounted() {
    setTimeout(() => {
      (async () => {
        await this.$loadScript(
          `../assets/js/icons/feather-icon/feather-icon.js`
        );
        await this.$loadScript(`../assets/js/form-validation-custom.js`);
      })();
    }, 1000);
  },
});
</script>

<style>
@import '../assets/css/fontawesome.css';
@import '../assets/css/icofont.css';
@import '../assets/css/themify.css';
@import '../assets/css/flag-icon.css';
@import '../assets/css/feather-icon.css';
@import '../assets/css/bootstrap.css';
@import '../assets/css/style.css';
@import '../assets/css/responsive.css';
@import '../assets/css/color-1.css';
</style>
