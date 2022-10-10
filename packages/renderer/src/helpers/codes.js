export const enterpriseImageCode = 'UPLOAD_LOGO';
export const productPropertyImageCode = 'UPLOAD_IMAGE';
export const unitPackageCode = 'UNIT';
export const roleAdminCode = 'ADMIN';
export const roleCashierCode = 'CASHIER';
export const cashPaymentMethodCode = 'PM_CASH';
export const stockFor = { entry: 'StockEntry', exit: 'StockExit' };
export const stockTypeCode = {
  directEntry: 'E_STOCK_DIRECT',
  command: 'E_STOCK_CMD',
  saleDeposit: 'STOCK_SALE_DEPOSIT',
  transfer: 'STOCK_TRANSFER',
  sale: 'S_STOCK_SALE',
};
export const stockStateCode = {
  success: 'SUCCESS',
  pending: 'PENDING',
  archived: 'ARCHIVED',
  delivered: 'DELIVERED',
  awaiting: 'AWAITING',
  initiate: 'INITIATE',
  partial_delivered: 'PARTIALLY_DELIVERED',
};
export const moduleCode = {
  customers: 'CUSTOMERS',
  enterprise: 'ENTERPRISE',
  iam: 'IAM',
  payments: 'PAYMENTS',
  products: 'PRODUCTS',
  sales: 'SALES',
  stocks: 'STOCKS',
};

export const actionCode = {
  created: 'created',
  updated: 'updated',
  deleted: 'deleted',
  restored: 'restored',
};

export const privilegeCode = {
  manageDashboard: 'Dashboard.manage',
  enterpriseArticleStat: 'Enterprise.viewAnyArticleStats',
  enterpriseArticleLineStat: 'Enterprise.viewAnyArticleLineStats',
};

export const saleTypeCode = {
  bulk: 'S_TYPE_BULK',
  detail: 'S_TYPE_DETAIL',
};

export const priceTypeCode = {
  buy: 'BUY_PRICE',
  sell: 'SELL_PRICE',
};

export const propertyTypeCode = {
  select: 'select',
  switcher: 'switcher',
  radio: 'radio',
  checkbox: 'checkbox',
  color: 'color',
};
