import {createApp} from 'vue';
import App from '/@/App.vue';
import router from '/@/router';
import loadScript from '/@/loadscript';

const app = createApp(App);
app.use(router)
app.config.globalProperties.$loadScript = loadScript;
app.mount('#app');
