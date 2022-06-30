import {
  ClientPrintJob,
  InstalledPrinter,
  JSPrintManager,
  WSStatus,
} from 'jsprintmanager';

const state = {
  default_printer: null,
  print_after_sale: true,
  printers: [],
  jspm_state: null,
};

// getters
const getters = {
  getDefaultPrinter: (state) => state.default_printer,
  printAfterSale: (state) => state.print_after_sale,
  getPrinters: (state) => state.printers,
  available_jspm: (state) => state.jspm_state === WSStatus.Open,
};

// privileges
const actions = {
  initPrint({ commit }) {
    JSPrintManager.auto_reconnect = true;
    return JSPrintManager.start().then(() => {
      JSPrintManager.WS.onStatusChanged = function () {
        commit('SET_JSPM_STATE', JSPrintManager.websocket_status);
      };
    });
  },

  getInstalledPrinters({ commit }) {
    return JSPrintManager.getPrinters().then((printers) => {
      commit('SET_PRINTERS', printers);
    });
  },
};

// mutations
const mutations = {
  SET_PRINTERS(state, printers) {
    state.printers = printers;
  },
  SET_DEFAULT_PRINTER(state, default_printer) {
    state.default_printer = default_printer;
  },
  SET_PRINT_AFTER_SALE(state, print_after_sale) {
    state.print_after_sale = print_after_sale;
  },
  SET_JSPM_STATE(state, jspm_state) {
    state.jspm_state = jspm_state;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
