const articleRoutes = [
  {
    path: '',
    name: 'articles',
    component: () => import('/@/views/articles/ArticleList.vue'),
  },
  {
    path: ':id?/forms',
    name: 'article.form',
    component: () => import('/@/views/articles/Form.vue'),
  },
  {
    path: ':id/details',
    component: () => import('/@/components/articles/DetailLayout.vue'),
    meta: {
      requireArticle: true,
    },
    children: [
      {
        path: '',
        name: 'article.detail',
        component: () => import('/@/views/articles/details/Details.vue'),
      },
    ],
  },
  {
    path: 'groups',
    name: 'article.groups',
    component: () => import('/@/views/articles/groups/GroupList.vue'),
  },
  {
    path: 'groups/:id?/forms',
    name: 'article.group.form',
    component: () => import('/@/views/articles/groups/Form.vue'),
  },
  {
    path: 'groups/:id/details',
    name: 'article.group.detail',
    component: () => import('/@/views/articles/groups/Details.vue'),
  },
];
export default articleRoutes;
