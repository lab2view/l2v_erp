import { createRouter, createWebHashHistory } from "vue-router";
import Page from "/@/components/layouts/Page.vue";
import workspace from "./workspace";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("/@/views/landing/Welcome.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/@/views/auth/Login.vue"),
  },
  {
    path: "/lock-screen",
    name: "lockScreen",
    component: () => import("/@/views/auth/LockScreen.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("/@/views/auth/Register.vue"),
  },
  {
    path: "/forget-password",
    name: "forgetPassword",
    component: () => import("/@/views/auth/ForgetPassword.vue"),
  },
  {
    path: "/workspace",
    component: Page,
    children: workspace,
  },
  {
    path: "/maintenance",
    name: "maintenance",
    component: () => import("/@/views/landing/Maintenance.vue"),
  },
  {
    path: "/404",
    name: "pageNotFound",
    component: () => import("/@/views/landing/PageNotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "pageNotFound" },
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
