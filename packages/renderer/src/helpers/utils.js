import { actionCode, priceTypeCode } from '/@/helpers/codes';
import _, { sumBy } from 'lodash';
import localStore from '/@/store/helpers/localStore';

export function getMutationPathName({ mutation, action }) {
  switch (action) {
    case actionCode.created:
      return `${mutation}/ADD_${mutation.toString().toUpperCase()}`;
    case actionCode.updated:
      return `${mutation}/UPDATE_${mutation.toString().toUpperCase()}`;
    case actionCode.deleted:
      return `${mutation}/DELETE_${mutation.toString().toUpperCase()}`;
    default:
      return null;
  }
}

export const getDefaultProductImage = '/@/assets/images/smiley.png';

export function removeStorage() {
  return localStore.dropInstance();
}

export function getStockExitLineArticleStock(article) {
  const totalEntry =
    parseInt(article.stock.total_entry) +
    parseInt(article.stock.total_entry_composition);
  const totalExit =
    parseInt(article.stock.total_exit) +
    parseInt(article.stock.total_exit_composition);
  return totalEntry - totalExit;
}

export function getDistributionCurrentStock(distribution) {
  const totalEntry =
    parseInt(distribution.total_entry ?? 0) +
    parseInt(distribution.total_entry_composition ?? 0);
  const totalExit =
    parseInt(distribution.total_exit ?? 0) +
    parseInt(distribution.total_exit_composition ?? 0);
  return totalEntry - totalExit;
}

export function getWorkspaceTotalArticleStock(article) {
  let stock = 0;
  article.stats.distributions.forEach(
    (distribution) => (stock += getDistributionCurrentStock(distribution))
  );
  return stock;
}

export function getStockByEnterpriseId(enterprise_id, article) {
  const distribution = article.stats.distributions.find(
    (d) => d.id === parseInt(enterprise_id)
  );
  return distribution !== undefined
    ? getDistributionCurrentStock(distribution)
    : article.stock.available;
}

export function isGilsSport(domain) {
  return RegExp('gils-sport*').test(domain);
}
export function getPrinterRawText({
  enterprise,
  discount,
  code,
  created_at,
  cashier_session,
  stock_exit_lines,
  cashier_session_collections,
  customer,
}) {
  //Create ESP/POS commands for sample label
  const esc = '\x1B'; //ESC byte in hex notation
  const newLine = '\x0A'; //LF byte in hex notation

  // i18n.global.t();
  let cmds = esc + '@'; //Initializes the printer (ESC @)
  cmds += esc + '!' + '\x38'; //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex
  cmds += `${enterprise.name}`.toUpperCase();
  cmds += newLine;
  cmds += esc + '!' + '\x00'; //Character font A selected (ESC ! 0)
  if (enterprise.slogan) {
    cmds += `${enterprise.slogan}`.toUpperCase();
    cmds += newLine;
  }
  if (isGilsSport(enterprise.domain)) {
    cmds += `-------`.toUpperCase();
    cmds += newLine;
    cmds +=
      'Carrefour Famous / Carrefour mini prix bastos \u00e0 cot\u00e9 du Fast Food KMC';
    cmds += newLine;
  }

  cmds += `-------`.toUpperCase();
  cmds += newLine;
  if (enterprise.matriculation || enterprise.trade_register) {
    cmds += `NIU: ${enterprise.matriculation}`.toUpperCase();
  }
  if (enterprise.trade_register) {
    cmds += `  RCCM: ${enterprise.trade_register}`.toUpperCase();
  }

  if (isGilsSport(enterprise.domain) && customer) {
    cmds += newLine;
    cmds += `-------`.toUpperCase();
    cmds += newLine;
    cmds += `Client: ${customer.first_name} ${customer.name}`;
  }

  cmds += newLine;
  cmds += newLine;
  // cmds += `TEL: ${enterprise.phone || ''}`.toUpperCase();
  // cmds += newLine;
  // cmds += `Ref: ${reference}`.toUpperCase();
  // cmds += newLine;
  // cmds += `Caisse: ${cashier_session.cash_register.label}`.toUpperCase();
  // cmds += newLine;
  // cmds += `Caissier:  ${truncate(cashier_session.cashier.code, {
  //   length: 15,
  // })}`.toUpperCase();
  // cmds += newLine + newLine;

  // cmds += esc + '!' + '\x24'; //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex
  // cmds += 'SELL TICKET'; //text to print
  // cmds += newLine + newLine;
  // cmds += esc + '!' + '\x00'; //Character font A selected (ESC ! 0)

  stock_exit_lines.forEach((stockExitLine) => {
    cmds += `${stockExitLine.article.product.code.slice(
      -4
    )} ${stockExitLine.article.name.toUpperCase()} x${
      stockExitLine.quantity
    } ${getFormattedAmount(stockExitLine.sup_price)}`; //text to print
    cmds += newLine;
  });

  cmds += newLine;
  let total = sumBy(stock_exit_lines, 'sup_price');
  cmds += `TOTAL        ${getFormattedAmount(total)} ${enterprise.currency}`;
  if (discount) {
    total -= discount;
    cmds += newLine;
    cmds += `REDUCTION    ${getFormattedAmount(discount)} ${
      enterprise.currency
    }`;
    cmds += newLine;
    cmds += `TOTAL PAYE        ${getFormattedAmount(total)} ${
      enterprise.currency
    }`;
    cmds += newLine;
  }
  let paymentMethod = '';
  cashier_session_collections.forEach(
    (csc) => (paymentMethod += csc.payment_method.label + ' ')
  );
  cmds += newLine;
  cmds += `${paymentMethod.toUpperCase()}    ${getFormattedAmount(
    sumBy(cashier_session_collections, 'cashin') || 0
  )} ${enterprise.currency}`;
  cmds += newLine;
  cmds += `RENDUE       ${getFormattedAmount(
    sumBy(cashier_session_collections, 'cashout') || 0
  )} ${enterprise.currency}`;

  cmds += esc + '!' + '\x00'; //Character font A selected (ESC ! 0)
  cmds += newLine + newLine;
  const date = new Date(created_at);
  cmds += `${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${
    cashier_session.cashier.name
  }, ${cashier_session.cash_register.label.toString().toUpperCase()}`;
  cmds += newLine;
  cmds += `-------------------------`.toUpperCase();
  cmds += newLine;
  cmds += `Merci de votre visite, Ref: ${code}`.toUpperCase();

  cmds += newLine + newLine;
  cmds += newLine + newLine;
  cmds += newLine + newLine;

  console.log(cmds);

  return cmds;
}

export function getFormattedAmount(amount) {
  return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function getSaleTotalAmount(stock_exit_lines) {
  return sumBy(stock_exit_lines, 'sup_price').toLocaleString();
}

export function getSaleAmount({ stock_exit_lines, discount }) {
  return (sumBy(stock_exit_lines, 'sup_price') - discount).toLocaleString();
}

export function transformSaleForTable(sale) {
  const totalSupPrice = _.sumBy(sale.stock_exit_lines, 'sup_price');
  const totalArticleBuyPrice = _.sumBy(
    sale.stock_exit_lines.map((sel) => {
      const price = sel.article?.prices?.find(
        (p) => p.price_type.code === priceTypeCode.buy
      );
      return { buy_price: (price?.value ?? 0) * sel.quantity };
    }),
    'buy_price'
  );
  const sale_amount =
    totalSupPrice - (sale.discount ? parseFloat(sale.discount) : 0);
  const sale_win_amount = (sale_amount - totalArticleBuyPrice).toFixed(2);

  const quantities = _(sale.stock_exit_lines)
    .groupBy((sel) => sel.article.product.product_unit.label)
    .map((objs, key) => {
      return {
        unit: key,
        total: _.sumBy(objs, 'quantity'),
      };
    })
    .value();

  const saleDiscount = sale.discount ?? 0;
  const saleTotalAmountAfterDiscount = totalSupPrice - saleDiscount;
  return {
    id: sale.id,
    enterprise: {
      id: sale.enterprise_id,
      name: sale.enterprise?.name ?? null,
    },
    reference: sale.reference,
    code: sale.code,
    sup_amount: totalSupPrice,
    discount: saleDiscount,
    sale_amount,
    created_at: sale.created_at,
    sale_win_amount: parseFloat(sale_win_amount),
    sale_win_amount_percent:
      saleTotalAmountAfterDiscount > 0
        ? parseFloat(
            ((sale_win_amount * 100) / saleTotalAmountAfterDiscount).toFixed(2)
          )
        : -100,
    quantities,
  };
}

export function csvToArray(str, delimiter = ',') {
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');

  return rows.map(function (row) {
    const values = row.split(delimiter);
    return headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
  });
}

export async function getContentCsvFileAsArray(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(csvToArray(e.target.result));
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}
