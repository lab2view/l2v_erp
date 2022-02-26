export function notify(
  message,
  title = '',
  type = 'theme',
  icon = 'fa fa-bell-o'
) {
  if (typeof jQuery !== 'undefined') {
    $.notify(`<i class="${icon}"></i><strong>${title}</strong> ${message}`, {
      type: type,
      allow_dismiss: true,
      delay: 2500,
      showProgressbar: true,
      timer: 300,
    });
  }
}
