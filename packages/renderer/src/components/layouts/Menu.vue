<template>
  <header class="main-nav">
    <div class="sidebar-user text-center">
      <a class="setting-primary" href="javascript:void(0)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-settings"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg> </a
      ><img
        class="img-90 rounded-circle"
        src="../../../assets/images/dashboard/1.png"
        alt=""
      />
      <div class="badge-bottom">
        <span class="badge badge-primary">New</span>
      </div>
      <a href="user-profile.html">
        <h6 class="mt-3 f-14 f-w-600">Emay Walter</h6></a
      >
      <p class="mb-0 font-roboto">Human Resources Department</p>
      <ul>
        <li>
          <span><span class="counter">19.8</span>k</span>
          <p>Follow</p>
        </li>
        <li>
          <span>2 year</span>
          <p>Experince</p>
        </li>
        <li>
          <span><span class="counter">95.2</span>k</span>
          <p>Follower</p>
        </li>
      </ul>
    </div>
    <nav>
      <div class="main-navbar">
        <div id="mainnav">
          <ul class="nav-menu custom-scrollbar">
            <li class="back-btn">
              <div class="mobile-back text-end">
                <span>Back</span
                ><i class="fa fa-angle-right ps-2" aria-hidden="true"></i>
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

export default defineComponent({
  components: { MenuModule },
  computed: {
    modules() {
      return [
        {
          name: 'Produits',
          code: 'PRODUCTS',
          menus: [
            {
              label: 'Produits',
              icon: 'grid',
              code: 'Product.manage',
              items: [
                {
                  label: 'Ajouter un produit',
                  code: 'Product.create',
                  to: 'product.create',
                },
                {
                  label: 'Liste des produits',
                  code: 'Product.viewAny',
                  to: 'product',
                },
              ],
            },
            {
              label: 'Articles',
              icon: 'shopping-cart',
              code: 'Product.manage',
              items: [
                {
                  label: 'Liste des articles',
                  code: 'Article.viewAny',
                  to: 'product.create',
                },
                {
                  label: "Groupe d'articles",
                  code: 'ArticleGroup.viewAny',
                  to: 'articleGroup',
                },
                {
                  label: 'Compositions',
                  code: 'Composition.viewAny',
                  to: 'composition',
                },
              ],
            },
            {
              label: 'Configurations',
              icon: 'settings',
              code: 'Product.manage',
              items: [
                {
                  label: 'Conditionnement',
                  code: 'Package.viewAny',
                  to: 'package',
                },
                {
                  label: 'Type de prix',
                  code: 'PriceType.viewAny',
                  to: 'priceType',
                },
                {
                  label: 'Famille de produit',
                  code: 'ProductFamily.viewAny',
                  to: 'productFamily',
                },
                {
                  label: 'Type de produit',
                  code: 'ProductType.viewAny',
                  to: 'productType',
                },
                {
                  label: 'Unite de produit',
                  code: 'ProductUnit.viewAny',
                  to: 'productUnit',
                },
                {
                  label: 'Taxes',
                  code: 'Tax.viewAny',
                  to: 'tax',
                },
                {
                  label: 'Proprietes',
                  code: 'Property.viewAny',
                  to: 'property',
                },
              ],
            },
          ],
        },
        {
          name: 'Stocks',
          code: 'STOCKS',
          menus: [],
        },
        {
          name: 'Ventes',
          code: 'SALES',
          menus: [],
        },
        {
          name: 'Clients',
          code: 'CUSTOMERS',
          menus: [],
        },
        {
          name: 'Paiements',
          code: 'PAYMENTS',
          menus: [],
        },
        {
          name: 'Structures',
          code: 'ENTERPRISE',
          menus: [],
        },
        {
          name: 'IAM',
          code: 'IAM',
          menus: [],
        },
      ];
    },
  },
});
</script>

<style scoped></style>
