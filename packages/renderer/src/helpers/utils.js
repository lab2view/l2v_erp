// export function getVerifyEmailRoute() {
//   return `${location.protocol}//${location.host}/email/verify/{token}`;
// }
//
// export function getPasswordResetRoute() {
//   return `${location.protocol}//${location.host}/password/reset/{token}?email={email}`;
// }

import { actionCode } from '/@/helpers/codes.js';
import { sumBy } from 'lodash';
// import i18n from '/@/i18n';
import localStore from '/@/store/helpers/localStore.js';

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

export function getPrinterRawText({
  enterprise,
  discount,
  code,
  created_at,
  cashier_session,
  stock_exit_lines,
  cashier_session_collections,
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
  cmds += `-------`.toUpperCase();
  cmds += newLine;
  if (enterprise.matriculation || enterprise.trade_register) {
    cmds += `NIU: ${enterprise.matriculation}`.toUpperCase();
  }
  if (enterprise.trade_register) {
    cmds += `  RCCM: ${enterprise.trade_register}`.toUpperCase();
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
    cmds += `NET A PAYER        ${getFormattedAmount(total)} ${
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
  cmds += `___________________________`.toUpperCase();
  cmds += newLine + newLine;

  // console.log(cmds);

  return cmds;
}

export function getFormattedAmount(amount) {
  return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
