export const productMenus = [
  {
    icon: 'shopping-cart',
    code: 'Articles.manage',
    prefix: 'article',
    items: [
      {
        code: 'Article.viewAny',
        to: 'articles',
      },
      {
        code: 'ArticleGroup.viewAny',
        to: 'article.groups',
      },
    ],
  },
  {
    icon: 'grid',
    code: 'Products.manage',
    prefix: 'product',
    items: [
      {
        code: 'Product.create',
        to: 'product.form.desc',
      },
      {
        code: 'Product.viewAny',
        to: 'products',
      },
    ],
  },
  {
    icon: 'settings',
    label: 'Configurations',
    code: null,
    prefix: 'config.product',
    items: [
      {
        code: 'package.viewAny',
        to: 'config.product.package',
      },
      {
        code: 'PriceType.viewAny',
        to: 'config.product.priceType',
      },
      {
        code: 'ProductFamily.viewAny',
        to: 'config.product.productFamily',
      },
      {
        code: 'ProductType.viewAny',
        to: 'config.product.productType',
      },
      {
        code: 'ProductUnit.viewAny',
        to: 'config.product.productUnit',
      },
      {
        code: 'Tax.viewAny',
        to: 'config.product.tax',
      },
      {
        code: 'Property.viewAny',
        to: 'config.product.property',
      },
    ],
  },
];

export const structureMenus = [
  {
    icon: 'shopping-bag',
    code: 'Enterprises.manage',
    prefix: 'enterprise',
    items: [
      {
        code: 'Enterprise.viewAny',
        to: 'enterprises',
      },
      {
        code: 'Enterprise.create',
        to: 'enterprise.form.desc',
      },
    ],
  },
  {
    icon: 'grid',
    code: 'Localizations.manage',
    prefix: 'localizations',
    items: [
      {
        code: 'Localization.viewAny',
        to: 'localizations',
      },
      {
        code: 'Country.viewAny',
        to: 'localizations.countries',
      },
      {
        code: 'Region.viewAny',
        to: 'localizations.regions',
      },
    ],
  },
  {
    icon: 'settings',
    code: 'Enterprises.manage',
    label: 'Configurations',
    prefix: 'types.entreprise',
    items: [
      {
        code: 'EnterpriseType.viewAny',
        to: 'types.entreprise',
      },
    ],
  },
];

export const customerMenus = [
  {
    icon: 'users',
    code: 'Customers.manage',
    prefix: 'customer',
    items: [
      {
        code: 'Customer.viewAny',
        to: 'customers',
      },
      {
        code: 'Customer.create',
        to: 'customer.form.desc',
      },
    ],
  },
  {
    icon: 'settings',
    code: 'Customers.manage',
    label: 'Configurations',
    prefix: 'types.customer',
    items: [
      {
        code: 'CustomerType.viewAny',
        to: 'types.customer',
      },
      {
        code: 'CustomerGroup.viewAny',
        to: 'groups.customer',
      },
    ],
  },
];
