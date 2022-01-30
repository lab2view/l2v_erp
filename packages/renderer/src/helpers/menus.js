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
        code: 'EnterpriseType.viewAny',
        to: 'enterprise.types',
      },
    ],
  },
  {
    icon: 'grid',
    code: 'Localizations.manage',
    prefix: 'localization',
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
