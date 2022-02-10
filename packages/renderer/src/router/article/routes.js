import ArticleGroupFormRoutes from '../article/group/formRoutes';
import store from '../../store';

export default [
  {
    path: '',
    name: 'articles',
    component: () => import('/@/views/articles/ArticleList.vue'),
  },
  {
    path: ':id?/form',
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
        name: 'article.details',
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
    component: () => import('/@/components/articles/groups/FormLayout.vue'),
    children: ArticleGroupFormRoutes,
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('article_group/getArticleGroup', to.params.id)
          .then(() => {
            return { name: to.name };
          })
          .catch(() => -1);
      } else {
        if (to.meta.requireArticleGroup) return -1;
      }
    },
  },
  {
    path: 'groups/:id/details',
    name: 'article.group.detail',
    component: () => import('/@/views/articles/groups/Details.vue'),
  },
];
