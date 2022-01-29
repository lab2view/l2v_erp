import routes from './product/routes';
import articleRoutes from './articleRoutes';
import structureRoutes from './structures/routes';

const workspace = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('/@/views/Dashboard.vue'),
  },
  {
    path: 'products',
    component: () => import('/@/components/products/ProductLayout.vue'),
    children: routes,
  },
  {
    path: 'articles',
    component: () => import('/@/components/articles/ArticleLayout.vue'),
    children: articleRoutes,
  },
  {
    path: '',
    children: [
      structureRoutes
    ],
  },
];

export default workspace;
