import ArticleGroupFormRoutes from '../article/group/formRoutes';
import store from '../../store';

export default [
  {
    path: '',
    name: 'articles',
    component: () => import('/@/views/articles/ArticleList.vue'),
    children: [
      {
        path: 'set-global-prices',
        name: 'article.setPrice',
        component: () =>
          import('/@/views/articles/forms/ArticlePricesForm.vue'),
      },
    ],
  },
  {
    path: 'search-results',
    name: 'article.finder',
    component: () =>
      import('/@/views/sales/session/SaleModalSearchResults.vue'),
  },
  {
    path: ':id/details',
    component: () => import('/@/components/articles/DetailLayout.vue'),
    beforeEnter: (to) => {
      return store
        .dispatch('article/getArticle', to.params.id)
        .then(() => 1)
        .catch(() => -1);
    },
    children: [
      {
        path: '',
        name: 'article.details',
        component: () => import('/@/views/articles/details/Details.vue'),
      },
      {
        path: 'entries',
        name: 'article.entry.line.form',
        component: () => import('/@/views/articles/details/EntryLineForm.vue'),
      },
      {
        path: 'prices',
        name: 'article.prices',
        component: () => import('/@/views/articles/details/Prices.vue'),
        children: [
          {
            path: 'form',
            name: 'article.prices.from',
            component: () =>
              import(
                '/@/views/products/configurations/priceType/PriceTypeForm.vue'
              ),
          },
        ],
      },
      {
        path: 'compositions',
        name: 'article.compositions',
        component: () => import('/@/views/articles/details/Compositions.vue'),
      },
      {
        path: 'compositions/config',
        name: 'article.compositions.config',
        component: () =>
          import('/@/views/articles/details/CompositionPresets.vue'),
        children: [
          {
            path: 'form',
            name: 'article.compositions.config.from',
            component: () =>
              import('/@/views/articles/details/CompositionPresetForm.vue'),
          },
        ],
      },
    ],
  },
  {
    path: 'groups',
    name: 'article.groups',
    component: () => import('/@/views/articles/groups/GroupList.vue'),
  },
  {
    path: 'sales',
    name: 'article.sales',
    component: () => import('/@/views/sales/MostSalesList.vue'),
    meta: {
      code: 'articlesale.viewAny',
    },
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
];
