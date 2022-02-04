export default [
  {
    path: 'description',
    name: 'article.group.form.desc',
    component: () =>
      import('/@/views/articles/groups/forms/ArticleGroupDescription.vue'),
    meta: {
      code: 'ArticleGroup.form.description',
      icon: 'fa fa-info',
    },
  },
  {
    path: 'settings',
    name: 'article.group.form.setting',
    component: () =>
      import('/@/views/articles/groups/forms/ArticleGroupSettings.vue'),
    meta: {
      code: 'ArticleGroup.form.setting',
      icon: 'fa fa-cogs',
      requireArticleGroup: true,
    },
  },
];
