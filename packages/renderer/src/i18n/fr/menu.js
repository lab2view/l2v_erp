export default {
  modules: {
    products: 'Products',
    articles: 'Articles',
    stocks: 'Stocks',
    sales: 'Ventes',
    customers: 'Clients',
    payments: 'Paiements',
    structures: 'Entreprises',
    enterprise: 'Structures',
    iam: 'IAM',
    manage: 'Modules',
  },
  salediscounts: {
    manage: 'Reductions',
  },
  sales: {
    manage: 'Caisses',
  },
  products: {
    manage: 'Produits',
  },
  enterprises: {
    manage: 'Structures',
  },
  localizations: {
    manage: 'Localisations',
  },
  customers: {
    manage: 'Clients',
  },
  module: {
    create: 'Ajouter un module',
    viewany: 'Liste des modules',
    form: {
      description: 'Description du module',
    },
  },
  iam: {
    manage: 'IAM',
    user: {
      form: {
        desc: "Description de l'utilisateur",
        privileges: "Privileges de l'utilisateur",
      },
    },
  },
  saletype: {
    viewany: 'Types de vente',
  },
  cashier: {
    viewany: 'Caissiers',
  },
  cashiergroup: {
    viewany: 'Groupes de caissiers',
  },
  cashregister: {
    viewany: 'Liste des caisses',
  },
  discount: {
    create: 'Ajouter une reduction',
    viewany: 'Liste des reductions',
    form: {
      desc: 'Description de la reduction',
      articles: 'Articles de la reduction',
      customers: 'Clients de la reduction',
      codes: 'Codes de la reduction',
    },
  },
  discounttype: {
    viewany: 'Types de reduction',
  },
  sale: {
    viewany: 'Liste des ventes',
  },
  transaction: {
    viewany: 'Transactions',
  },
  transactiontype: {
    viewany: 'Types de transaction',
  },
  paymentmethod: {
    viewany: 'Methodes de paiement',
  },
  charge: {
    viewany: 'Charges de paiement',
  },
  localization: {
    create: 'Ajouter une adresse',
    viewany: 'Liste des adresses',
    form: {
      description: "Description de l'adresse",
    },
  },
  country: {
    create: 'Activer un pays',
    add: 'Ajouter un pays',
    viewany: 'Liste des pays',
    update: 'Activer un pays',
    form: {
      description: 'Description du pays',
    },
  },
  region: {
    create: 'Activer une region',
    add: 'Ajouter une region',
    viewany: 'Liste des regions',
    form: {
      description: 'Description de la region',
    },
  },
  enterprise: {
    create: 'Ajouter une structure',
    viewany: 'Liste des enterprise',
    form: {
      desc: 'Description de la structure',
      setting: 'Parametres de la structure',
      iam: 'Parametres utilisateurs de la structure',
      user:{
        desc: "Description de l'utilisateur",
        privileges: "Privileges de l'utilisateur",
      }
    },
  },
  enterprisetype: {
    create: 'Ajouter un type de structure',
    viewany: 'Liste des types de structure',
    form: {
      description: 'Description du type de structure',
    },
  },
  customer: {
    create: 'Ajouter un client',
    viewany: 'Liste des clients',
    form: {
      desc: 'Description du client',
    },
  },
  customertype: {
    create: 'Ajouter un type de clients',
    viewany: 'Liste des types de clients',
    form: {
      description: 'Description du type de clients',
    },
  },
  customergroup: {
    create: 'Ajouter un groupe de clients',
    viewany: 'Liste des groupes de clients',
    form: {
      description: 'Description du groupe de clients',
    },
  },
  customergroupline: {
    create: 'Ajouter un client a un groupe de clients',
    viewany: 'Liste des clients du groupes de clients',
  },
  product: {
    create: 'Ajouter un produit',
    viewany: 'Liste des produits',
    form: {
      description: 'Description du produit',
      setting: 'Parametrage avance',
      article: 'Conditionnements',
      stock: 'Entrees en stocks',
    },
  },
  articles: {
    manage: 'Articles',
  },
  article: {
    create: 'Ajouter un article',
    viewany: 'Liste des articles',
    detail: 'Stats',
    price: 'Prix',
    composition: 'Compositions',
  },
  articlegroup: {
    viewany: "Groupes d'articles",
    create: 'Ajouter un groupe',
    form: {
      description: 'Description du groupe',
      item: 'Gerer les articles',
      setting: 'Configurations',
    },
  },
  package: {
    viewany: 'Conditionnements',
    create: 'Ajouter un conditionnement',
  },
  pricetype: {
    viewany: 'Types de prix',
  },
  productfamily: {
    viewany: 'Familles de produit',
  },
  producttype: {
    viewany: 'Types de produit',
  },
  productunit: {
    viewany: 'Unites de produit',
  },
  tax: {
    viewany: 'Taxes',
  },
  property: {
    viewany: 'Proprietes',
  },
  stocks: {
    manage: 'Mouvements',
  },
  stockentry: {
    viewany: 'Approvisionnements',
    form: {
      description: "Description de l'entree",
      line: 'Liste des articles',
      provision: 'provisions',
    },
  },
  stockexit: {
    viewany: 'Sorties de Stock',
    form: {
      description: 'Description de la sortie',
      line: 'Liste des articles',
      multiple: 'Articles Multi-structures',
    },
  },
  stocktype: {
    viewany: 'Types de Stock',
  },
  stockstate: {
    viewany: 'Status de Stock',
  },
  inventory: {
    viewany: 'Inventaires',
  },
  provider: {
    viewany: 'Fournisseurs',
  },
  shipping: {
    viewany: 'Livraisons',
    form: {
      description: 'Description de la livraison',
      line:'liste des produits'
    },
  },
  movement: {
    entry: "Mouvements d'entree",
    exit: 'Mouvements de sortie',
  },
  role: {
    manage: 'Roles',
    viewany: 'Liste des roles',
  },
  user: {
    manage: 'Utilisateurs',
    viewany: 'Liste des utilisateurs',
    create: 'Ajouter un utilisateur',
  },
};
