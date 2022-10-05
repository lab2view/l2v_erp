<template>
  <div v-if="canShowWorkspace" class="customizer-links">
    <div
      aria-orientation="vertical"
      class="nav flex-column nac-pills"
      role="tablist"
      title="Espace de travail"
    >
      <a
        v-for="(workspace, index) in selectWorkspace"
        :key="`workspace-${index}`"
        class="nav-link"
        data-bs-toggle="pill"
        href="#"
        @click.prevent="setCurrentWorkspace(workspace)"
      >
        <div class="settings">
          <i class="icofont icofont-laptop-alt"></i>
        </div>
        <span>{{ workspace.name }}</span>
      </a>
    </div>
  </div>
  <div id="pageWrapper" class="page-wrapper">
    <!-- Page Header Start-->
    <Header />
    <!-- Page Header Ends                              -->
    <!-- Page Body Start-->
    <div class="page-body-wrapper horizontal-menu">
      <!-- Page Sidebar Start-->
      <Menu />
      <!-- Page Sidebar Ends-->

      <div class="page-body">
        <router-view />
      </div>
      <!-- footer start-->
      <Footer />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Header from '/@/components/layouts/Header.vue';
import Footer from '/@/components/layouts/Footer.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'ShopPage',
  components: { Footer, Header },
  computed: {
    ...mapGetters('workspace', ['workspaces', 'currentWorkspace']),
    selectWorkspace() {
      return this.workspaces.filter((w) => w.id !== this.currentWorkspace.id);
    },
    canShowWorkspace() {
      return this.selectWorkspace.length > 0;
    },
  },
  created() {
    setTimeout(() => {
      (async () => {
        await this.$loadScript(`./src/assets/js/jquery-3.5.1.min.js`);
        await this.$loadScript(`./src/assets/js/sidebar-menu.js`);
      })();
    }, 500);
  },
});
</script>

<style scoped>
@import '../../assets/css/prism.css';
</style>
