import Echo from 'laravel-echo';

const echo = new Echo({
  broadcast: "socket.io",
  host: "127.0.0.1:6001"
});
// host: window.location.hostname + ':6001'

window.Echo = echo;

export default echo;
