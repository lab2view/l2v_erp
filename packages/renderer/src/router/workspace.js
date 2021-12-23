const workspace = [
  {
    path: "/",
    redirect: "dashboard",
  },
  {
    path: "dashboard",
    name: "dashboard",
    component: () => import("/@/views/workspace/Dashboard.vue"),
  },
];
export default workspace;
