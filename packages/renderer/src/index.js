import { createApp } from 'vue';
import App from '/@/App.vue';
import loadScript from '/@/loadscript';
import lodash from 'lodash';
import socket from 'socket.io-client';
import router from '/@/router';
import store from '/@/store';
import i18n from '/@/i18n';

window._ = lodash;
window.io = socket;

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.config.globalProperties.$loadScript = loadScript;

app.mount('#app');
