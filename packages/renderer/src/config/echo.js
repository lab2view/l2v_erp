import Echo from 'laravel-echo';

async function initEchoClient(store, loadScript) {
  const workspace = store.getters['workspace/currentWorkspace'];
  const currentDomain = workspace?.domain ?? store.state.landlordDomain;
  const protocol = import.meta.env.VITE_PROTOCOL ?? 'https';

  await loadScript(
    `${protocol}://${currentDomain}:6001/socket.io/socket.io.js`
  );

  let echo = new Echo({
    broadcaster: 'socket.io',
    host: `${protocol}://${currentDomain}:6001`,
  });
  echo.connector.options.auth.headers['X-Tenant-Domain'] = currentDomain;

  await store.restored;

  const token = store.getters['auth/token'] ?? null;
  if (token) {
    echo.connector.options.auth.headers['Authorization'] = `Bearer ${token}`;
  }

  return echo;
}

export default initEchoClient;
