import productRoutes from './product/routes';
import articleRoutes from './article/routes';
import { customerRoutes } from './customers/customerRoutes';
import { enterpriseRoutes } from './structures/enterpriseRoutes';
import { localizationRoutes } from './structures/localizationRoutes';
import { saleRoutes } from '/@/router/sales/saleRoutes';
import { stockRoutes } from '/@/router/stocks/stockRoutes';
import { paymentRoutes } from '/@/router/payments/paymentRoutes';

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
    children: productRoutes,
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
    path: 'customers',
    component: () => import('/@/components/customers/CustomerLayout.vue'),
    children: customerRoutes,
  },
  {
    path: 'sales',
    component: () => import('/@/components/sales/SaleLayout.vue'),
    children: saleRoutes,
  },
  {
    path: 'stocks',
    component: () => import('/@/components/stocks/StockLayout.vue'),
    children: stockRoutes,
  },
  {
    path: 'payments',
    component: () => import('/@/components/payments/PaymentLayout.vue'),
    children: paymentRoutes,
  },
];

export default workspace;
