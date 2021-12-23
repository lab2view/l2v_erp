import { createStore } from 'vuex'
import auth from "./modules/auth";

export default createStore({
  state : {
    globalLoading: true
  },
  actions: {
    setGlobalLoading({commit}, loading) {
      setTimeout(() => commit("SET_GLOBAL_LOADING", loading), 1000);
    }
  },
  mutations: {
    SET_GLOBAL_LOADING(state, loading) {
      state.globalLoading = loading
    }
  },
  modules: {
    auth,
  },
  strict: process.env.NODE_ENV !== "production"
})
