const workspace = [
  {
    path: "/",
    redirect: "dashboard",
  },
  {
    path: "dashboard",
    name: "dashboard",
    component: () => import("/@/views/Dashboard.vue"),
  },
];
export default workspace;
