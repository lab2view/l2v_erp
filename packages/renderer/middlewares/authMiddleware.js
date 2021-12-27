import store from "@/store";
import { getUserSession } from "../helpers/utils";

export default (to, from, next) => {
  store.dispatch("setGlobalLoading");
  const data = getUserSession("current_user_credentials");
  if (data) {
    if (
      to.matched.some((record) => record.meta.requiresEmailVerification) &&
      (data.user.email_verified_at === null ||
        data.user.email_verified_at === undefined)
    )
      next({ name: "EmailVerify" });

    if (store.state.auth.user === null)
      store.commit("auth/SET_USER_TOKEN", data);

    if (to.matched.some((record) => record.meta.redirectAuth))
      next({ name: "dashboard" });
  } else {
    if (to.matched.some((record) => record.meta.requiresAuth))
      next({ name: "Login", query: { redirect: to.path } });
  }
  next();
};
