import { createApp } from 'vue';
import App from '/@/App.vue';
import loadScript from '/@/loadscript';
import router from '/@/router';
import store from '/@/store';
import i18n from '/@/i18n';
import 'assets/css/datatables.css';
import 'assets/css/fontawesome.css';
import 'assets/css/icofont.css';
import 'assets/css/themify.css';
import 'assets/css/flag-icon.css';
import 'assets/css/feather-icon.css';
import 'assets/css/scrollable.css';
import 'assets/css/bootstrap.css';
import 'assets/css/style.css';
import 'assets/css/responsive.css';
import 'assets/css/color-1.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.config.globalProperties.$loadScript = loadScript;

app.mount('#app');
