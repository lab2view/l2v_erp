import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';

const currentWorkspace = localStorage.getItem('currentWorkspace')
  ? JSON.parse(localStorage.getItem('currentWorkspace'))
  : null;
const currentWorkSpaceDatabase = currentWorkspace
  ? currentWorkspace.database
  : 'kitbusiness';

let localStore = localForage.createInstance({
  name: currentWorkSpaceDatabase,
});

const Auth = new VuexPersistence({
  key: 'auth',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ auth: state.auth }),
});

const PackageConfig = new VuexPersistence({
  key: 'packageConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ packageConfig: state.packageConfig }),
});

const PriceTypeConfig = new VuexPersistence({
  key: 'priceTypeConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ priceTypeConfig: state.priceTypeConfig }),
});

const ProductFamilyConfig = new VuexPersistence({
  key: 'productFamilyConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ productFamilyConfig: state.productFamilyConfig }),
});

const ProductTypeConfig = new VuexPersistence({
  key: 'productTypeConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ productTypeConfig: state.productTypeConfig }),
});

const ProductUnitConfig = new VuexPersistence({
  key: 'productUnitConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ productUnitConfig: state.productUnitConfig }),
});

const TaxConfig = new VuexPersistence({
  key: 'taxConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ taxConfig: state.taxConfig }),
});

const PropertyConfig = new VuexPersistence({
  key: 'propertyConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ propertyConfig: state.propertyConfig }),
});

const Product = new VuexPersistence({
  key: 'product',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ product: state.product }),
});

const Article = new VuexPersistence({
  key: 'article',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ article: state.article }),
});

const StockProvision = new VuexPersistence({
  key: 'stock_provision',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ stock_provision: state.stock_provision }),
});

const StockExit = new VuexPersistence({
  key: 'stock_exit',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ stock_exit: state.stock_exit }),
});

const StockExitLine = new VuexPersistence({
  key: 'stock_exit_line',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ stock_exit_line: state.stock_exit_line }),
});

const ArticleGroup = new VuexPersistence({
  key: 'article_group',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ article_group: state.article_group }),
});

const Enterprise = new VuexPersistence({
  key: 'enterprise',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ enterprise: state.enterprise }),
});

const EnterpriseTypeConfig = new VuexPersistence({
  key: 'enterpriseTypeConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ enterpriseTypeConfig: state.enterpriseTypeConfig }),
});

const Country = new VuexPersistence({
  key: 'country',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ country: state.country }),
});

const Localization = new VuexPersistence({
  key: 'localization',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ localization: state.localization }),
});

const Module = new VuexPersistence({
  key: 'module',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ module: state.module }),
});

const Region = new VuexPersistence({
  key: 'region',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ region: state.region }),
});

const Customer = new VuexPersistence({
  key: 'customer',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ customer: state.customer }),
});

const CustomerTypeConfig = new VuexPersistence({
  key: 'customerType',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ customerType: state.customerType }),
});

const CustomerGroupConfig = new VuexPersistence({
  key: 'customerGroup',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ customerGroup: state.customerGroup }),
});

export default [
  Auth.plugin,
  Product.plugin,
  PackageConfig.plugin,
  PropertyConfig.plugin,
  TaxConfig.plugin,
  PriceTypeConfig.plugin,
  ProductFamilyConfig.plugin,
  ProductTypeConfig.plugin,
  ProductUnitConfig.plugin,
  Article.plugin,
  StockProvision.plugin,
  StockExit.plugin,
  StockExitLine.plugin,
  ArticleGroup.plugin,
  Enterprise.plugin,
  EnterpriseTypeConfig.plugin,
  Country.plugin,
  Localization.plugin,
  Module.plugin,
  Region.plugin,
  Customer.plugin,
  CustomerGroupConfig.plugin,
  CustomerTypeConfig.plugin,
];
