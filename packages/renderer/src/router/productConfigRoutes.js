import store from '../store';

export const productConfigRoutes = [
  {
    path: '',
    redirect: { name: 'config.product.package' },
  },
  {
    path: 'packages',
    name: 'config.product.package',
    component: () =>
      import('/@/views/products/configurations/package/PackageList.vue'),
    meta: {
      name: 'Conditionnements',
      feather: 'package',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.product.package.form',
        component: () =>
          import('/@/views/products/configurations/package/PackageForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('packageConfig/getPackage', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'price-types',
    name: 'config.product.priceType',
    component: () =>
      import('/@/views/products/configurations/priceType/PriceTypeList.vue'),
    meta: {
      name: 'Type de prix',
      feather: 'dollar-sign',
    },
  },
  {
    path: 'product-families',
    name: 'config.product.productFamily',
    component: () =>
      import(
        '/@/views/products/configurations/productFamily/ProductFamilyList.vue'
      ),
    meta: {
      name: 'Famille de produit',
      feather: 'shopping-bag',
    },
  },
  {
    path: 'product-types',
    name: 'config.product.productType',
    component: () =>
      import(
        '/@/views/products/configurations/productType/ProductTypeList.vue'
      ),
    meta: {
      name: 'Type de produit',
      feather: 'filter',
    },
  },
  {
    path: 'product-units',
    name: 'config.product.productUnit',
    component: () =>
      import(
        '/@/views/products/configurations/productUnit/ProductUnitList.vue'
      ),
    meta: {
      name: 'Unite de produit',
      feather: 'info',
    },
  },
  {
    path: 'properties',
    name: 'config.product.property',
    component: () =>
      import('/@/views/products/configurations/property/PropertyList.vue'),
    meta: {
      name: 'Proprietes',
      feather: 'list',
    },
  },
  {
    path: 'taxes',
    name: 'config.product.tax',
    component: () => import('/@/views/products/configurations/tax/TaxList.vue'),
    meta: {
      name: 'Taxes',
      feather: 'percent',
    },
  },
];
