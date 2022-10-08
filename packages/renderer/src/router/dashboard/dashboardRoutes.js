export default [
  {
    path: ':enterprise_id?/stats',
    name: 'dashboard.enterprise.article.stats',
    component: () => import('/@/views/dashboard/EnterpriseArticleStats.vue'),
  },
];
