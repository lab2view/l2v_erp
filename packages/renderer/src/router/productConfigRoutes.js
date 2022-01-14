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
      code: 'package.viewAny',
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
      code: 'PriceType.viewAny',
      feather: 'dollar-sign',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.product.priceType.form',
        component: () =>
          import(
            '/@/views/products/configurations/priceType/PriceTypeForm.vue'
          ),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('priceTypeConfig/getPriceType', to.params.id)
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
    path: 'product-types',
    name: 'config.product.productType',
    component: () =>
      import(
        '/@/views/products/configurations/productType/ProductTypeList.vue'
      ),
    meta: {
      code: 'ProductType.viewAny',
      feather: 'filter',
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
      code: 'ProductFamily.viewAny',
      feather: 'shopping-bag',
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
      code: 'ProductUnit.viewAny',
      feather: 'info',
    },
  },
  {
    path: 'properties',
    name: 'config.product.property',
    component: () =>
      import('/@/views/products/configurations/property/PropertyList.vue'),
    meta: {
      code: 'Property.viewAny',
      feather: 'list',
    },
  },
  {
    path: 'taxes',
    name: 'config.product.tax',
    component: () => import('/@/views/products/configurations/tax/TaxList.vue'),
    meta: {
      code: 'Tax.viewAny',
      feather: 'percent',
    },
  },
];
