export const productMenus = [
  {
    label: 'Produits',
    icon: 'grid',
    code: 'Product.manage',
    prefix: 'product',
    items: [
      {
        label: 'Ajouter un produit',
        code: 'Product.create',
        to: 'product.form',
      },
      {
        label: 'Liste des produits',
        code: 'Product.viewAny',
        to: 'products',
      },
    ],
  },
  {
    label: 'Articles',
    icon: 'shopping-cart',
    code: 'Product.manage',
    prefix: 'article',
    items: [
      {
        label: 'Liste des articles',
        code: 'Article.viewAny',
        to: 'articles',
      },
      {
        label: "Groupe d'articles",
        code: 'ArticleGroup.viewAny',
        to: 'article.groups',
      },
    ],
  },
  {
    label: 'Configurations',
    icon: 'settings',
    code: 'Product.manage',
    prefix: 'config.product',
    items: [
      {
        label: 'Conditionnement',
        code: 'package.viewAny',
        to: 'config.product.package',
      },
      {
        label: 'Type de prix',
        code: 'PriceType.viewAny',
        to: 'config.product.priceType',
      },
      {
        label: 'Famille de produit',
        code: 'ProductFamily.viewAny',
        to: 'config.product.productFamily',
      },
      {
        label: 'Type de produit',
        code: 'ProductType.viewAny',
        to: 'config.product.productType',
      },
      {
        label: 'Unite de produit',
        code: 'ProductUnit.viewAny',
        to: 'config.product.productUnit',
      },
      {
        label: 'Taxes',
        code: 'Tax.viewAny',
        to: 'config.product.tax',
      },
      {
        label: 'Proprietes',
        code: 'Property.viewAny',
        to: 'config.product.property',
      },
    ],
  },
];
