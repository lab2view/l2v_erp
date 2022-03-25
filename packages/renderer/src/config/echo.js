import Echo from 'laravel-echo';
import store from '/@/store/index.js';

const workspace = store.getters['workspace/currentWorkspace'];
const currentDomain = workspace?.domain ?? store.state.landlordDomain;
const protocol = import.meta.env.VITE_PROTOCOL ?? 'https';

let echo = new Echo({
  broadcaster: 'socket.io',
  host: `${protocol}://${currentDomain}:6001`,
});
echo.connector.options.auth.headers['X-Tenant-Domain'] = currentDomain;

store.restored.then(() => {
  const token = store.getters['auth/token'] ?? null;
  if (token) {
    echo.connector.options.auth.headers['Authorization'] = `Bearer ${token}`;
  }
});

export default echo;