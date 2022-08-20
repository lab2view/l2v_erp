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
    path: 'items',
    name: 'article.group.form.item',
    component: () =>
      import('/@/views/articles/groups/forms/ArticleGroupItems.vue'),
    meta: {
      code: 'ArticleGroup.form.item',
      icon: 'fa fa-list',
      requireArticleGroup: true,
    },
    children: [
      {
        path: 'form',
        name: 'article.group.form.item.form',
        component: () =>
          import('/@/views/articles/groups/forms/ArticleGroupLineForm.vue'),
      },
    ],
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
    children: [
      {
        path: 'discount',
        name: 'article.group.form.setting.discount',
        component: () =>
          import(
            '/@/views/articles/groups/forms/ArticleGroupSettingsDiscount.vue'
          ),
      },
    ],
  },
];
