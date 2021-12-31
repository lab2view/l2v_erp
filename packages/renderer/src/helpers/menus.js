export const productMenus = [
  {
    label: 'Produits',
    icon: 'grid',
    code: 'Product.manage',
    items: [
      {
        label: 'Ajouter un produit',
        code: 'Product.create',
        to: null,
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
    items: [
      {
        label: 'Liste des articles',
        code: 'Article.viewAny',
        to: 'product.create',
      },
      {
        label: "Groupe d'articles",
        code: 'ArticleGroup.viewAny',
        to: 'articleGroup',
      },
    ],
  },
  {
    label: 'Configurations',
    icon: 'settings',
    code: 'Product.manage',
    items: [
      {
        label: 'Conditionnement',
        code: 'package.viewAny',
        to: 'package',
      },
      {
        label: 'Type de prix',
        code: 'PriceType.viewAny',
        to: 'priceType',
      },
      {
        label: 'Famille de produit',
        code: 'ProductFamily.viewAny',
        to: 'productFamily',
      },
      {
        label: 'Type de produit',
        code: 'ProductType.viewAny',
        to: 'productType',
      },
      {
        label: 'Unite de produit',
        code: 'ProductUnit.viewAny',
        to: 'productUnit',
      },
      {
        label: 'Taxes',
        code: 'Tax.viewAny',
        to: 'tax',
      },
      {
        label: 'Proprietes',
        code: 'Property.viewAny',
        to: 'property',
      },
    ],
  },
];
