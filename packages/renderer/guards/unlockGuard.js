import store from "../src/store";

export default (to, from, next) => {
  if (!store.state.auth.unlock) {
    if (from.href) next({ name: from.name });
    else next({ name: "lockScreen" });
  }
};
