import { createRouter, createWebHashHistory } from "vue-router";
import Page from "/@/components/layouts/Page.vue";
import workspace from "./workspace";
import store from "/@/store";
import landlordGuard from "../../guards/landlordGuard";
import workspaceGuard from "../../guards/workspaceGuard";
import authGuard from "../../guards/authGuard";
import unlockGuard from "../../guards/unlockGuard";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("/@/views/Workspace.vue"),
    meta: {
      requireLandlord: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/@/views/auth/Login.vue"),
    meta: {
      requireWorkspace: true,
    },
  },
  {
    path: "/lock-screen",
    name: "lockScreen",
    component: () => import("/@/views/auth/LockScreen.vue"),
    meta: {
      requireWorkspace: true,
      requireAuth: true,
    },
  },
  {
    path: "/forget-password",
    name: "forgetPassword",
    component: () => import("/@/views/auth/ForgetPassword.vue"),
    meta: {
      requireWorkspace: true,
    },
  },
  {
    path: "/maintenance",
    name: "maintenance",
    component: () => import("/@/views/Maintenance.vue"),
  },
  {
    path: "/404",
    name: "pageNotFound",
    component: () => import("/@/views/PageNotFound.vue"),
  },
  {
    path: "/workspace",
    component: Page,
    children: workspace,
    meta: {
      requireWorkspace: true,
      requireAuth: true,
      requireUnlock: true,
    },
  },
  { path: "/:pathMatch(.*)*", redirect: { name: "pageNotFound" } },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  store.dispatch("setGlobalLoading", true);
  await store.restored;

  if (to.meta.requireLandlord) landlordGuard(to, from, next);
  if (to.meta.requireWorkspace) workspaceGuard(to, from, next);
  if (to.meta.requireAuth) authGuard(to, from, next);
  if (to.meta.requireUnlock) unlockGuard(to, from, next);

  next();
});

router.afterEach(() => {
  setTimeout(() => store.dispatch("setGlobalLoading", false), 500);
});

export default router;
