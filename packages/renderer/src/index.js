import { createApp } from 'vue';
import App from '/@/App.vue';
import loadScript from '/@/loadscript';
import lodash from 'lodash';
import router from '/@/router';
import store from '/@/store';
import i18n from '/@/i18n';
import initEchoClient from '/@/config/echo.js';

window._ = lodash;

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.config.globalProperties.$loadScript = loadScript;

initEchoClient(store, loadScript)
  .then((echo) => {
    app.config.globalProperties.$echo = echo;

    app.mount('#app');
  })
  .catch((error) => {
    alert(
      `${error.type
        .toString()
        .toUpperCase()} : Socket server is not available !`
    );

    app.mount('#app');
  });
