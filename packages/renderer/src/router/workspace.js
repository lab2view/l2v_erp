import routes from './product/routes';
import articleRoutes from './articleRoutes';
import { enterpriseConfigRoutes, enterpriseRoutes } from './structures/enterpriseRoutes';
import { localizationRoutes } from './structures/localizationRoutes';

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
    path: 'enterprises',
    component: () => import('/@/components/structures/EnterpriseLayout.vue'),
    children: enterpriseRoutes,
  },
  {
    path: 'localizations',
    component: () => import('/@/components/structures/LocalizationLayout.vue'),
    children: localizationRoutes,
  },
  {
    path: 'modules',
    component: () => import('/@/components/structures/ModuleLayout.vue'),
    children: enterpriseConfigRoutes,
  },
];

export default workspace;
