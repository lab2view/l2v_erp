export default [
  {
    path: ':enterprise_id?/stats',
    name: 'dashboard.enterprise.article.stats',
    component: () => import('/@/views/dashboard/EnterpriseArticleStats.vue'),
  },
  {
    path: ':enterprise_id?/stock-levels',
    name: 'dashboard.enterprise.article.levels',
    component: () =>
      import('/@/views/dashboard/EnterpriseArticleStockLevels.vue'),
  },
];
