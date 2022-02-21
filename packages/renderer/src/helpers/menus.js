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
    prefix: 'types.enterprise',
    items: [
      {
        code: 'EnterpriseType.viewAny',
        to: 'types.enterprise',
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
    ],
  },
  {
    icon: 'settings',
    code: 'Customers.manage',
    label: 'Configurations',
    prefix: 'config.customers',
    items: [
      {
        code: 'CustomerType.viewAny',
        to: 'config.customers.types',
      },
      {
        code: 'CustomerGroup.viewAny',
        to: 'config.customers.groups',
      },
    ],
  },
];

export const stockMenus = [
  {
    icon: 'repeat',
    code: 'Stocks.manage',
    prefix: 'stocks',
    items: [
      {
        code: 'Provision.viewAny',
        to: 'stocks.provisions',
      },
      {
        code: 'StockExit.viewAny',
        to: 'stocks.exits',
      },
    ],
  },
  {
    icon: 'clipboard',
    code: 'Inventory.viewAny',
    prefix: 'inventories',
    to: 'inventories',
  },
  {
    icon: 'user-check',
    code: 'Provider.viewAny',
    prefix: 'providers',
    to: 'providers',
  },
  {
    icon: 'truck',
    code: 'Shipping.viewAny',
    prefix: 'shippings',
    to: 'shippings',
  },
  {
    icon: 'settings',
    code: 'Stocks.manage',
    label: 'Configurations',
    prefix: 'config.stocks',
    items: [
      {
        code: 'StockType.viewAny',
        to: 'config.stocks.types',
      },
      {
        code: 'StockState.viewAny',
        to: 'config.stocks.states',
      },
    ],
  },
];
