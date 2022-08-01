import store from '../../store';

export default [
  {
    path: '',
    redirect: { name: 'config.products.package' },
  },
  {
    path: 'packages',
    name: 'config.products.package',
    component: () =>
      import('/@/views/products/configurations/package/PackageList.vue'),
    meta: {
      code: 'package.viewAny',
      feather: 'package',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.products.package.form',
        component: () =>
          import('/@/views/products/configurations/package/PackageForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('package/getPackage', to.params.id)
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
    name: 'config.products.priceType',
    component: () =>
      import('/@/views/products/configurations/priceType/PriceTypeList.vue'),
    meta: {
      code: 'PriceType.viewAny',
      feather: 'dollar-sign',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.products.priceType.form',
        component: () =>
          import(
            '/@/views/products/configurations/priceType/PriceTypeForm.vue'
          ),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('price_type/getPriceType', to.params.id)
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
    path: 'products-types',
    name: 'config.products.productType',
    component: () =>
      import(
        '/@/views/products/configurations/productType/ProductTypeList.vue'
      ),
    meta: {
      code: 'ProductType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.products.productType.form',
        component: () =>
          import(
            '/@/views/products/configurations/productType/ProductTypeForm.vue'
          ),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('product_type/getProductType', to.params.id)
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
    path: 'products-families',
    name: 'config.products.productFamily',
    component: () =>
      import(
        '/@/views/products/configurations/productFamily/ProductFamilyList.vue'
      ),
    meta: {
      code: 'ProductFamily.viewAny',
      feather: 'shopping-bag',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.products.productFamily.form',
        component: () =>
          import(
            '/@/views/products/configurations/productFamily/ProductFamilyForm.vue'
          ),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('product_family/getProductFamily', to.params.id)
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
    path: 'products-units',
    name: 'config.products.productUnit',
    component: () =>
      import(
        '/@/views/products/configurations/productUnit/ProductUnitList.vue'
      ),
    meta: {
      code: 'ProductUnit.viewAny',
      feather: 'info',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.products.productUnit.form',
        component: () =>
          import(
            '/@/views/products/configurations/productUnit/ProductUnitForm.vue'
          ),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('product_unit/getProductUnit', to.params.id)
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
    path: 'properties',
    name: 'config.products.property',
    component: () =>
      import('/@/views/products/configurations/property/PropertyList.vue'),
    meta: {
      code: 'Property.viewAny',
      feather: 'list',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.products.property.form',
        component: () =>
          import('/@/views/products/configurations/property/PropertyForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('property/getProperty', to.params.id)
              .then(() => 1)
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'taxes',
    name: 'config.products.tax',
    component: () => import('/@/views/products/configurations/tax/TaxList.vue'),
    meta: {
      code: 'Tax.viewAny',
      feather: 'percent',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.products.tax.form',
        component: () =>
          import('/@/views/products/configurations/tax/TaxForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('tax/getTax', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
];
