import { createRouter, createWebHashHistory } from 'vue-router';
import Page from '/@/components/layouts/Page.vue';
import workspace from './workspace';
import store from '/@/store';

import landlordGuard from '../guards/landlordGuard';
import workspaceGuard from '../guards/workspaceGuard';
import authGuard from '../guards/authGuard';
import unlockGuard from '../guards/unlockGuard';
import redirectAuthGuard from '../guards/redirectAuthGuard';
import productGuard from '../guards/productGuard';
import productArticleGroupGuard from '/@/guards/productArticleGroupGuard';
import customerGroupGuard from '/@/guards/customerGroupGuard';
import discountGuard from '/@/guards/discountGuard';
import stockEntryGuard from '/@/guards/stockEntryGuard';
import stockExitGuard from '/@/guards/stockExitGuard.js';
import cashierSessionGuard from '/@/guards/cashierSessionGuard.js';
import redirectCashierSessionGuard from '/@/guards/redirectCashierSessionGuard.js';
import userGuard from '/@/guards/userGuard.js';

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('/@/views/Workspace.vue'),
    meta: {
      requireLandlord: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/auth/Login.vue'),
    meta: {
      requireWorkspace: true,
      redirectAuth: true,
    },
  },
  {
    path: '/lock-screen',
    name: 'lockScreen',
    component: () => import('/@/views/auth/LockScreen.vue'),
    meta: {
      requireWorkspace: true,
      requireAuth: true,
    },
  },
  {
    path: '/open-cash-register',
    name: 'sales.session.auth',
    component: () => import('/@/views/sales/session/CashierSessionAuth.vue'),
    meta: {
      requireWorkspace: true,
      requireAuth: true,
      redirectCashierSession: true,
      code: 'CashierSession.create',
    },
  },
  {
    path: '/forget-password',
    name: 'forgetPassword',
    component: () => import('/@/views/auth/ForgetPassword.vue'),
    meta: {
      requireWorkspace: true,
      redirectAuth: true,
    },
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: () => import('/@/views/Maintenance.vue'),
  },
  {
    path: '/404',
    name: 'pageNotFound',
    component: () => import('/@/views/PageNotFound.vue'),
  },
  {
    path: '/workspace',
    component: Page,
    children: workspace,
    meta: {
      requireWorkspace: true,
      requireAuth: true,
      requireUnlock: true,
    },
  },
  { path: '/:pathMatch(.*)*', redirect: { name: 'pageNotFound' } },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else return { top: 0 };
  },
  // linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('setGlobalLoading', true);
  await store.restored;

  if (to.meta.requireLandlord) landlordGuard(to, from, next);
  if (to.meta.requireWorkspace) workspaceGuard(to, from, next);
  if (to.meta.requireAuth) authGuard(to, from, next);
  if (to.meta.redirectAuth) redirectAuthGuard(to, from, next);
  if (to.meta.requireUnlock) unlockGuard(to, from, next);
  if (to.meta.requireProduct) {
    await store.dispatch('product/getProduct', to.params.id);
    productGuard(to, from, next);
  }
  if (to.meta.requireUser) userGuard(to, from, next);
  if (to.meta.requireArticleGroup) productArticleGroupGuard(to, from, next);
  if (to.meta.requireCustomerGroup) customerGroupGuard(to, from, next);
  if (to.meta.requireDiscount) discountGuard(to, from, next);
  if (to.meta.requireStockEntry) stockEntryGuard(to, from, next);
  if (to.meta.requireStockExit) stockExitGuard(to, from, next);
  if (to.meta.requireCashierSession) cashierSessionGuard(to, from, next);
  if (to.meta.redirectCashierSession)
    redirectCashierSessionGuard(to, from, next);

  next();
});

router.afterEach(() => {
  if (store.state.initiateApp) {
    setTimeout(() => store.dispatch('setGlobalLoading', false), 1500);
    store.dispatch('setInitiateApp', false);
  } else store.dispatch('setGlobalLoading', false);
});

export default router;
