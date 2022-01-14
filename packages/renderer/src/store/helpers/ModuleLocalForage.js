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

export const Auth = new VuexPersistence({
  key: 'auth',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ auth: state.auth }),
});

export const PackageConfig = new VuexPersistence({
  key: 'packageConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => state.packageConfig,
});

export const PriceTypeConfig = new VuexPersistence({
  key: 'priceTypeConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => state.priceTypeConfig,
});

export const ProductConfig = new VuexPersistence({
  key: 'productConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => state.productConfig,
});

export const ProductFamilyConfig = new VuexPersistence({
  key: 'productFamilyConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => state.productFamilyConfig,
});

export const ProductTypeConfig = new VuexPersistence({
  key: 'productTypeConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => state.productTypeConfig,
});

export const ProductUnitConfig = new VuexPersistence({
  key: 'productUnitConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => state.productUnitConfig,
});

export const TaxConfig = new VuexPersistence({
  key: 'taxConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => state.taxConfig,
});

export const PropertyConfig = new VuexPersistence({
  key: 'propertyConfig',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => state.propertyConfig,
});

// export const Workspace = new VuexPersistence({
//   key: "workspace",
//   storage: localStore,
//   asyncStorage: true,
//   reducer: (state) => ({ workspace: state.workspace }),
// });

