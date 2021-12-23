<template>
  <div id="pageWrapper" class="page-wrapper">
    <!-- Page Header Start-->
    <Header/>
    <!-- Page Header Ends                              -->
    <!-- Page Body Start-->
    <div class="page-body-wrapper horizontal-menu">
      <!-- Page Sidebar Start-->
      <Menu/>
      <!-- Page Sidebar Ends-->
      <div class="page-body">
        <router-view/>
      </div>
      <!-- footer start-->
      <Footer/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import Header from '/@/components/layouts/Header.vue';
import Menu from '/@/components/layouts/Menu.vue';
import Footer from "/@/components/layouts/Footer.vue";
export default defineComponent({
  name: "Page",
  components: {Footer, Menu, Header},
  mounted() {
    setTimeout(() => {
      (async () => {
        await this.$loadScript(`../../../assets/js/prism/prism.min.js`);
        await this.$loadScript(`../../../assets/js/clipboard/clipboard.min.js`);
        await this.$loadScript(`../../../assets/js/tooltip-init.js`);
        await this.$loadScript(`../../../assets/js/sidebar-menu.js`);
        await this.$loadScript(`../../../assets/js/theme-customizer/customizer.js`);
      })();
    }, 1000);
  }
})
</script>

<style scoped>
@import "../../../assets/css/prism.css";
</style>
