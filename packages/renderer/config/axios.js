import axios from "axios";
// import store from "@/store";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.timeout = 60000;
axios.defaults.crossDomain = true;
axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://erp-l2v.test/api"
    : `${location.protocol}//${location.host}/api`;
//
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         store.dispatch("auth/logout", false);
//         location.reload();
//       }
//       // if (error.response.status === 503) {
//       //   let message = null;
//       //   if (error.response.data && error.response.data.message)
//       //     message = error.response.data.message;
//       //   window.location.href = message
//       //     ? `/maintenance?message=${message}`
//       //     : "/maintenance";
//       // }
//       return Promise.reject(error);
//     } else {
//       store.dispatch("auth/logout", false);
//       return Promise.reject(error);
//     }
//   }
// );
