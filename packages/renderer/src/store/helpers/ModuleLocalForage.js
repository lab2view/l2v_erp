import VuexPersistence from 'vuex-persist';
import localStore from './localStore';

const Auth = new VuexPersistence({
  key: 'auth',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ auth: state.auth }),
});

const Package = new VuexPersistence({
  key: 'package',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ package: state.package }),
});

const PriceType = new VuexPersistence({
  key: 'price_type',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ price_type: state.price_type }),
});

const ProductFamily = new VuexPersistence({
  key: 'product_family',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ product_family: state.product_family }),
});

const ProductType = new VuexPersistence({
  key: 'product_type',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ product_type: state.product_type }),
});

const ProductUnit = new VuexPersistence({
  key: 'product_unit',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ product_unit: state.product_unit }),
});

const Tax = new VuexPersistence({
  key: 'tax',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ tax: state.tax }),
});

const Property = new VuexPersistence({
  key: 'property',
  restoreState: (key, storage) => {
    return storage.getItem(key).then((data) => JSON.parse(data));
  },
  saveState: (key, state, storage) => {
    return storage.setItem(key, JSON.stringify(state));
  },
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({
    property: state.property,
  }),
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
  restoreState: (key, storage) => {
    return storage.getItem(key).then((data) => JSON.parse(data));
  },
  saveState: (key, state, storage) => {
    return storage.setItem(key, JSON.stringify(state));
  },
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ stock_exit: state.stock_exit }),
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

const EnterpriseType = new VuexPersistence({
  key: 'enterprise_type',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ enterprise_type: state.enterprise_type }),
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

const CustomerType = new VuexPersistence({
  key: 'customer_type',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ customer_type: state.customer_type }),
});

const CustomerGroup = new VuexPersistence({
  key: 'customer_group',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ customer_group: state.customer_group }),
});

const Inventory = new VuexPersistence({
  key: 'inventory',
  restoreState: (key, storage) => {
    return storage.getItem(key).then((data) => JSON.parse(data));
  },
  saveState: (key, state, storage) => {
    return storage.setItem(key, JSON.stringify(state));
  },
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({
    inventory: state.inventory,
  }),
});

const Provider = new VuexPersistence({
  key: 'provider',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ provider: state.provider }),
});

const Shipping = new VuexPersistence({
  key: 'shipping',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ shipping: state.shipping }),
});

const StockState = new VuexPersistence({
  key: 'stock_state',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ stock_state: state.stock_state }),
});

const StockType = new VuexPersistence({
  key: 'stock_type',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ stock_type: state.stock_type }),
});

const StockEntry = new VuexPersistence({
  key: 'stock_entry',
  restoreState: (key, storage) => {
    return storage.getItem(key).then((data) => JSON.parse(data));
  },
  saveState: (key, state, storage) => {
    return storage.setItem(key, JSON.stringify(state));
  },
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ stock_entry: state.stock_entry }),
});

const PaymentMethod = new VuexPersistence({
  key: 'payment_method',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ payment_method: state.payment_method }),
});

const PaymentCharge = new VuexPersistence({
  key: 'payment_charge',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ payment_charge: state.payment_charge }),
});

const TransactionType = new VuexPersistence({
  key: 'transaction_type',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ transaction_type: state.transaction_type }),
});

const Transaction = new VuexPersistence({
  key: 'transaction',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ transaction: state.transaction }),
});

const DiscountType = new VuexPersistence({
  key: 'discount_type',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ discount_type: state.discount_type }),
});

const Discount = new VuexPersistence({
  key: 'discount',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ discount: state.discount }),
});

const CashRegister = new VuexPersistence({
  key: 'cash_register',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ cash_register: state.cash_register }),
});

const Cashier = new VuexPersistence({
  key: 'cashier',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ cashier: state.cashier }),
});

const CashierGroup = new VuexPersistence({
  key: 'cashier_group',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ cashier_group: state.cashier_group }),
});

const SaleType = new VuexPersistence({
  key: 'sale_type',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ sale_type: state.sale_type }),
});

const DiscountCode = new VuexPersistence({
  key: 'discount_code',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ discount_code: state.discount_code }),
});

const Role = new VuexPersistence({
  key: 'role',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ role: state.role }),
});

const User = new VuexPersistence({
  key: 'user',
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({ user: state.user }),
});

const CashierSession = new VuexPersistence({
  key: 'cashier_session',
  restoreState: (key, storage) => {
    return storage.getItem(key).then((data) => JSON.parse(data));
  },
  saveState: (key, state, storage) => {
    return storage.setItem(key, JSON.stringify(state));
  },
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({
    cashier_session: state.cashier_session,
  }),
});

const Sale = new VuexPersistence({
  key: 'sale',
  restoreState: (key, storage) => {
    return storage.getItem(key).then((data) => JSON.parse(data));
  },
  saveState: (key, state, storage) => {
    return storage.setItem(key, JSON.stringify(state));
  },
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({
    sale: state.sale,
  }),
});

const Printer = new VuexPersistence({
  key: 'printer',
  restoreState: (key, storage) => {
    return storage.getItem(key).then((data) => JSON.parse(data));
  },
  saveState: (key, state, storage) => {
    return storage.setItem(key, JSON.stringify(state));
  },
  storage: localStore,
  asyncStorage: true,
  reducer: (state) => ({
    printer: state.printer,
  }),
});

export default [
  Auth.plugin,
  Product.plugin,
  Package.plugin,
  Property.plugin,
  Tax.plugin,
  PriceType.plugin,
  ProductFamily.plugin,
  ProductType.plugin,
  ProductUnit.plugin,
  Article.plugin,
  StockProvision.plugin,
  StockExit.plugin,
  ArticleGroup.plugin,
  Enterprise.plugin,
  EnterpriseType.plugin,
  Country.plugin,
  Localization.plugin,
  Module.plugin,
  Region.plugin,
  Customer.plugin,
  CustomerGroup.plugin,
  CustomerType.plugin,
  Inventory.plugin,
  Provider.plugin,
  Shipping.plugin,
  StockEntry.plugin,
  StockState.plugin,
  StockType.plugin,
  PaymentCharge.plugin,
  PaymentMethod.plugin,
  Transaction.plugin,
  TransactionType.plugin,
  Discount.plugin,
  DiscountType.plugin,
  DiscountCode.plugin,
  CashRegister.plugin,
  Cashier.plugin,
  CashierGroup.plugin,
  SaleType.plugin,
  Role.plugin,
  User.plugin,
  CashierSession.plugin,
  Sale.plugin,
  Printer.plugin,
];
