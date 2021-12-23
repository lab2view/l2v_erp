import {createApp} from 'vue';
import App from '/@/App.vue';
import loadScript from '/@/loadscript';
import router from '/@/router';
import store from '/@/store';

const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.$loadScript = loadScript;
app.mount('#app');
