<template>
  <div class="absolute-top">
    {{ version }}
  </div>
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

  data() {
    return {
      version: '0.0.2',
    };
  },

  mounted() {
    console.log('app.version');
    console.log(this.version);
    setTimeout(() => {
      (async () => {
        await this.$loadScript(
          `../assets/js/icons/feather-icon/feather-icon.js`
        );
      })();
    }, 1000);
  },
});
</script>

<style>
@import '../assets/css/datatables.css';
@import '../assets/css/fontawesome.css';
@import '../assets/css/icofont.css';
@import '../assets/css/themify.css';
@import '../assets/css/flag-icon.css';
@import '../assets/css/feather-icon.css';
@import '../assets/css/scrollable.css';
@import '../assets/css/bootstrap.css';
@import '../assets/css/style.css';
@import '../assets/css/responsive.css';
@import '../assets/css/color-1.css';

.absolute-top {
  z-index: 1;
  position: absolute;
  top: 20px;
  left: 10px;
  width: 50px;
  height: 30px;
  background-color: #000;
  color: #fff;
  font-weight: 800;
  font-size: 24px;
}
</style>
