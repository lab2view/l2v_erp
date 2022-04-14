const state = {
  barcode: null,
};

// getters
const getters = {};

// privileges
const actions = {
  onBarcodeScanned({ commit }, barcode) {
    console.log(barcode);
    commit('SET_BARCODE', barcode);
    return barcode;
  },
};

// mutations
const mutations = {
  SET_BARCODE(state, barcode) {
    state.barcode = barcode;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
