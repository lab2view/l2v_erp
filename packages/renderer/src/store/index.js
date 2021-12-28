import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import localForage from "localforage";
import auth from "./modules/auth";
import workspace from "./modules/workspace";

const vuexLocal = new VuexPersistence({
  storage: localForage,
  asyncStorage: true,
});

export default createStore({
  state: {
    globalLoading: true,
    landlordDomain: "kitbussiness.test",
  },
  actions: {
    setGlobalLoading({ commit }, loading) {
      setTimeout(() => commit("SET_GLOBAL_LOADING", loading), 1000);
    },
  },
  mutations: {
    SET_GLOBAL_LOADING(state, loading) {
      state.globalLoading = loading;
    },
    SET_LANDLORD_DOMAIN(state, domain) {
      state.landlordDomain = domain;
    },
  },
  modules: {
    auth,
    workspace,
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [vuexLocal.plugin],
});
