import { createStore } from "vuex";
import auth from "./modules/auth";
import VuexPersistence from "vuex-persist";
import localForage from "localforage";

const vuexLocal = new VuexPersistence({
  storage: localForage,
  asyncStorage: true,
});

export default createStore({
  state: {
    globalLoading: true,
    current_workspace_domain: "kitbussiness.test",
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
    SET_CURRENT_WORKSPACE_DOMAIN(state, domain) {
      state.current_workspace_domain = domain;
    },
  },
  modules: {
    auth,
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [vuexLocal.plugin],
});
