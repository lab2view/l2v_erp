const product = [
  {
    path: '/',
    redirect: 'product',
  },
  {
    path: 'products',
    name: 'product',
    component: () => import('/@/views/products/ProductList.vue'),
  },
  {
    path: 'forms',
    name: 'product',
    component: () => import('/@/views/products/ProductList.vue'),
  },
];
export default product;
