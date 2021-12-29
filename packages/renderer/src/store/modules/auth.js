const state = {
  user: null,
  token: null,
  unlock: true,
};

// getters
const getters = {
  token: (state) => {
    return state.token;
  },
};

// privileges
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
