if ($ === undefined || jQuery === undefined) {
  require('./../../assets/js/jquery-3.5.1.min.js');
}

export function notify(
  message,
  title = '',
  type = 'theme',
  icon = 'fa fa-bell-o'
) {
  jQuery.notify(`<i class="${icon}"></i><strong>${title}</strong> ${message}`, {
    type: type,
    allow_dismiss: true,
    delay: 2500,
    showProgressbar: true,
    timer: 300,
  });
}
