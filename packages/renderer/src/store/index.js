import { createStore } from "vuex";
import auth from "./modules/auth";

export default createStore({
  state: {
    globalLoading: true,
    current_workspace_domain: "www.kitbussiness.test",
    database: null,
  },
  actions: {
    setGlobalLoading({ commit }, loading) {
      setTimeout(() => commit("SET_GLOBAL_LOADING", loading), 1000);
    },

    async getDatabase({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.database) {
          return resolve(state.database);
        }
        let request = window.indexedDB.open(state.current_workspace_domain, 1);
        request.onerror = (event) => {
          console.error("ERROR: Unable to open database", event);
          reject({ message: "ERROR" });
        };
        request.onsuccess = (event) => {
          commit("SET_DATABASE", event.target.result);
          resolve(this.database);
        };
      });
    },
  },
  mutations: {
    SET_GLOBAL_LOADING(state, loading) {
      state.globalLoading = loading;
    },
    SET_CURRENT_WORKSPACE_DOMAIN(state, domain) {
      state.current_workspace_domain = domain;
    },
    SET_DATABASE(state, database) {
      state.database = database;
    },
  },
  modules: {
    auth,
  },
  strict: process.env.NODE_ENV !== "production",
});
