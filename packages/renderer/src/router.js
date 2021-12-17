import {createRouter, createWebHashHistory} from 'vue-router';

import ContentExample from '/@/views/ContentExample.vue';

const routes = [
  {path: '/', name: 'Home', component: ContentExample},
  {path: '/about', name: 'About', component: () => import('/@/views/About.vue')}, // Lazy load route component
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
