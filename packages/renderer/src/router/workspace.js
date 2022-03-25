import productRoutes from './products/routes';
import articleRoutes from './article/routes';
import { customerRoutes } from './customers/customerRoutes';
import { enterpriseRoutes } from './enterprise/enterpriseRoutes';
import { localizationRoutes } from './enterprise/localizationRoutes';
import { saleRoutes } from '/@/router/sales/saleRoutes';
import { stockRoutes } from '/@/router/stocks/stockRoutes';
import { paymentRoutes } from '/@/router/payments/paymentRoutes';
import { iamRoutes } from '/@/router/iam/iamRoutes';

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
    component: () => import('/@/components/products/ProductLayout.vue'),
    children: articleRoutes,
  },
  {
    path: 'enterprises',
    component: () => import('/@/components/enterprise/EnterpriseLayout.vue'),
    children: enterpriseRoutes,
  },
  {
    path: 'localizations',
    component: () => import('/@/components/enterprise/EnterpriseLayout.vue'),
    children: localizationRoutes,
  },
  {
    path: 'iam',
    component: () => import('/@/components/iam/IAMLayout.vue'),
    children: iamRoutes,
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
