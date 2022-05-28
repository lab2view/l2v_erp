// export function getVerifyEmailRoute() {
//   return `${location.protocol}//${location.host}/email/verify/{token}`;
// }
//
// export function getPasswordResetRoute() {
//   return `${location.protocol}//${location.host}/password/reset/{token}?email={email}`;
// }

import { actionCode } from '/@/helpers/codes.js';

export function getMutationPathName({ mutation, action }) {
  switch (action) {
    case actionCode.created:
      return `${mutation}/ADD_${mutation.toString().toUpperCase()}`;
    case actionCode.updated:
      return `${mutation}/UPDATE_${mutation.toString().toUpperCase()}`;
    case actionCode.deleted:
      return `${mutation}/DELETE_${mutation.toString().toUpperCase()}`;
    default:
      return null;
  }
}

export const getDefaultProductImage = '/@/assets/images/smiley.png';
