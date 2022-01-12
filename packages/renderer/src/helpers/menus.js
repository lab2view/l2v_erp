export const productMenus = [
  {
    icon: 'grid',
    code: 'Products.manage',
    prefix: 'product',
    items: [
      {
        code: 'Product.create',
        to: 'product.form',
      },
      {
        code: 'Product.viewAny',
        to: 'products',
      },
    ],
  },
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
