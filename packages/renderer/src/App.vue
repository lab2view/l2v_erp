<template>
<!--
  &lt;!&ndash; Loader starts&ndash;&gt;
  <Loader />
  &lt;!&ndash; Loader ends&ndash;&gt;
  &lt;!&ndash; page-wrapper Start&ndash;&gt;
  <router-view />
-->
  <div>
    <h1>Hello</h1>
    <button @click="reloadPage">Click here to reload</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// import Loader from '/@/components/Loader.vue';

export default defineComponent({
  name: 'App',
  components: {
    // Loader,
  },

  mounted() {
    // setTimeout(() => {
    //   (async () => {
    //     await this.$loadScript(`../assets/js/jquery-3.5.1.min.js`);
    //     await this.$loadScript(`../assets/js/icons/feather-icon/feather.min.js`);
    //     await this.$loadScript(`../assets/js/icons/feather-icon/feather-icon.js`);
    //     await this.$loadScript(`../assets/js/config.js`);
    //     await this.$loadScript(`../assets/js/bootstrap/popper.min.js`);
    //     await this.$loadScript(`../assets/js/bootstrap/bootstrap.min.js`);
    //     await this.$loadScript(`../assets/js/script.js`);
    //   })();
    // }, 1000);

    window?.ipcRenderer?.on('message', (event, text) => {
      console.log('====================================');
      console.log('Evenement message envoye par electron');
      console.log(text);
    })
    window?.ipcRenderer?.on('reloading', (event, text) => {
      console.log('====================================');
      console.log('Reload ending');
      console.log(text);
    })
  },
  methods: {
    reloadPage() {
      console.log('====================================');
      console.log('before reload from vue');
      window?.ipcRenderer?.send('reload', 'Reload from vue');
    }
  }
});
</script>

<!--<style>-->
<!--@import "../assets/css/fontawesome.css";-->
<!--@import "../assets/css/icofont.css";-->
<!--@import "../assets/css/themify.css";-->
<!--@import "../assets/css/flag-icon.css";-->
<!--@import "../assets/css/feather-icon.css";-->
<!--@import "../assets/css/bootstrap.css";-->
<!--@import "../assets/css/style.css";-->
<!--@import "../assets/css/responsive.css";-->
<!--@import "../assets/css/color-1.css";-->
<!--</style>-->
