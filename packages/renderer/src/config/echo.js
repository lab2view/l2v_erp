import Echo from 'laravel-echo';

export default async function initEchoClient(store, loadScript) {
  const workspace = store.getters['workspace/currentWorkspace'];
  const currentDomain = workspace?.domain ?? store.state.landlordDomain;
  const protocol = import.meta.env.VITE_PROTOCOL ?? 'https';

  console.log('PROTOCOL', import.meta.env, import.meta.env.VITE_PROTOCOL);

  await loadScript(
    `${protocol}://${currentDomain}:6001/socket.io/socket.io.js`
  );
  await store.restored;

  let headers = {
    'X-Tenant-Domain': currentDomain,
  };

  const token = store.getters['auth/token'] ?? null;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  return new Echo({
    broadcaster: 'socket.io',
    host: `${protocol}://${currentDomain}:6001`,
    auth: {
      headers,
    },
  });
}
