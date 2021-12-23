import { createStore } from 'vuex'
import auth from "./modules/auth";

export default createStore({
  state : {},
  mutations: {
  },
  modules: {
    auth,
  },
  strict: process.env.NODE_ENV !== "production"
})
