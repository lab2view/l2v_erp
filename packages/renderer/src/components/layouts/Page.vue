<template>
  <LockScreen v-if="showLockScreen" />
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
      <div class="page-body" :class="saleSessionPageClass">
        <router-view />
      </div>
      <!-- footer start-->
      <Footer v-if="!isCashierSessionRoute" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Header from '/@/components/layouts/Header.vue';
import Menu from '/@/components/layouts/Menu.vue';
import Footer from '/@/components/layouts/Footer.vue';
import { mapGetters } from 'vuex';
import SaleSessionMixin from '/@/mixins/SaleSessionMixin.js';
import LockScreen from '/@/views/auth/LockScreen.vue';

export default defineComponent({
  name: 'Page',
  components: { LockScreen, Footer, Menu, Header },
  mixins: [SaleSessionMixin],
  data() {
    return {
      events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
      logoutTimer: null,
    };
  },
  computed: {
    ...mapGetters('workspace', ['workspaces', 'currentWorkspace']),
    ...mapGetters('auth', ['unlock']),
    showLockScreen() {
      return !this.unlock;
    },
    selectWorkspace() {
      return this.workspaces.filter((w) => w.id !== this.currentWorkspace.id);
    },
    canShowWorkspace() {
      return this.selectWorkspace.length > 0;
    },
    saleSessionPageClass() {
      return this.isCashierSessionRoute ? 'p-0 pt-2' : '';
    },
  },

  created() {
    this.events.forEach((event) =>
      window.addEventListener(event, this.resetTimer)
    );
    if (!this.showLockScreen) this.seTimer();
  },

  mounted() {
    setTimeout(() => {
      (async () => {
        await this.$loadScript(`./src/assets/js/jquery-3.5.1.min.js`);
        await this.$loadScript(`./src/assets/js/sidebar-menu.js`);
        // await this.$loadScript(
        //   `./src/assets/js/theme-customizer/customizer.js`
        // );
      })();
    }, 1000);
  },

  methods: {
    setCurrentWorkspace(workspace) {
      this.$store.dispatch('workspace/setCurrentWorkspace', workspace);
    },
    resetTimer() {
      if (!this.showLockScreen) {
        clearTimeout(this.logoutTimer);
        this.seTimer();
      }
    },
    seTimer() {
      this.logoutTimer = setTimeout(() => {
        if (this.unlock) this.$store.commit('auth/SET_UNLOCK_SCREEN', false);
      }, 30 * 10 * 1000);
    },
  },

  beforeUnmount() {
    this.events.forEach((event) => window.removeEventListener(event, () => 1));
    clearTimeout(this.logoutTimer);
  },
});
</script>

<style scoped>
@import '../../assets/css/prism.css';
</style>
