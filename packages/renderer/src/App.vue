<template>
  <div class="absolute-top">
    {{ version }}
    <img alt="" src="./assets/logo.svg" />
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
      version: '0.0.1',
    };
  },

  mounted() {
    console.log('app.version');
    console.log(this.version);
    setTimeout(() => {
      (async () => {
        return Promise.all([
          await this.$loadScript(`./src/assets/js/jquery-3.5.1.min.js`),
          await this.$loadScript(
            `./src/assets/js/icons/feather-icon/feather.min.js`
          ),
          await this.$loadScript(
            `./src/assets/js/icons/feather-icon/feather-icon.js`
          ),
          await this.$loadScript(
            `./src/assets/js/notify/bootstrap-notify.min.js`
          ),
          await this.$loadScript(`./src/assets/js/bootstrap/popper.min.js`),
          await this.$loadScript(`./src/assets/js/bootstrap/bootstrap.min.js`),
          await this.$loadScript(`./src/assets/js/clipboard/clipboard.min.js`),
          await this.$loadScript(`./src/assets/js/prism/prism.min.js`),
          await this.$loadScript(
            `./src/assets/js/datatable/datatables/jquery.dataTables.min.js`
          ),
        ]);
      })();
    }, 1000);
  },
});
</script>

<style>
@import './assets/css/datatables.css';
@import './assets/css/fontawesome.css';
@import './assets/css/icofont.css';
@import './assets/css/themify.css';
@import './assets/css/flag-icon.css';
@import './assets/css/feather-icon.css';
@import './assets/css/scrollable.css';
@import './assets/css/bootstrap.css';
@import './assets/css/style.css';
@import './assets/css/responsive.css';
@import './assets/css/color-1.css';

.absolute-top {
  z-index: 10000;
  position: absolute;
  top: 20px;
  left: 10px;
  width: auto;
  height: auto;
  padding: 20px;
  border: 2px solid #000;
  font-weight: 800;
  font-size: 24px;
}

.absolute-top img {
  width: 40px;
  height: 30px;
}
</style>
