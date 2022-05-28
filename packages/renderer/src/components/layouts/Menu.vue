<template>
  <header class="main-nav" :class="sliderMenuClass">
    <div class="sidebar-user text-center">
      <router-link class="setting-primary" :to="{ name: 'iam.profile' }">
        <svg
          class="feather feather-settings"
          fill="none"
          height="24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg> </router-link
      ><img
        alt=""
        class="img-90 rounded-circle"
        src="../../assets/images/dashboard/1.png"
      />
      <div class="badge-bottom">
        <router-link :to="{ name: 'iam.profile' }">
          <span class="badge badge-primary">
            {{ $t('common.my_account') }}
          </span>
        </router-link>
      </div>
      <a href="#">
        <h6 class="mt-3 f-14 f-w-600">{{ currentUserEmail }}</h6></a
      >
      <p class="mb-0 font-roboto">{{ currentUserRole }}</p>
    </div>
    <nav v-if="!isCashierSessionRoute">
      <div class="main-navbar">
        <div id="mainnav">
          <ul class="nav-menu custom-scrollbar">
            <li class="back-btn">
              <div class="mobile-back text-end">
                <span>Back</span
                ><i aria-hidden="true" class="fa fa-angle-right ps-2"></i>
              </div>
            </li>
            <li class="dropdown">
              <router-link
                :to="{ name: 'dashboard' }"
                class="nav-link menu-title link-nav"
                ><i data-feather="home"></i
                ><span>Tableau de bord</span></router-link
              >
            </li>
            <MenuModule
              v-for="(module, index) in modules"
              :key="index"
              :module="module"
            />
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import MenuModule from '/@/components/layouts/MenuModule.vue';
import {
  customerMenus,
  paymentMenus,
  productMenus,
  saleMenus,
  stockMenus,
  structureMenus,
  iamMenus,
} from '/@/helpers/menus';
import { mapGetters } from 'vuex';
import SaleSessionMixin from '/@/mixins/SaleSessionMixin';

export default defineComponent({
  components: { MenuModule },
  mixins: [SaleSessionMixin],
  computed: {
    ...mapGetters('auth', ['currentUserEmail', 'currentUserRole']),
    modules() {
      return [
        {
          code: 'PRODUCTS',
          menus: productMenus,
        },
        {
          code: 'STOCKS',
          menus: stockMenus,
        },
        {
          code: 'SALES',
          menus: saleMenus,
        },
        {
          code: 'CUSTOMERS',
          menus: customerMenus,
        },
        {
          code: 'PAYMENTS',
          menus: paymentMenus,
        },
        {
          code: 'STRUCTURES',
          menus: structureMenus,
        },
        {
          code: 'IAM',
          menus: iamMenus,
        },
      ];
    },
  },
});
</script>

<style scoped></style>
