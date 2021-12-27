export function getVerifyEmailRoute() {
  return `${location.protocol}//${location.host}/email/verify/{token}`;
}

export function getPasswordResetRoute() {
  return `${location.protocol}//${location.host}/password/reset/{token}?email={email}`;
}
