import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("/@/views/Landing/Welcome.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/@/views/auth/Login.vue"),
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
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
