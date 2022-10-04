import {random} from 'lodash';

function getCheckDigit(code) {
  let codePartials = code.split('');
  let checkDigits = null;
  let evenNumbers = 0;
  let oddNumbers = 0;

  (codePartials || []).map((value, key) => {
    let number = parseInt(value, 10);
    if ((key + 1) % 2 === 0) {
      // Keys start from 0, We want the start to be 1
      evenNumbers += number;
    } else {
      oddNumbers += number;
    }
  });

  evenNumbers = evenNumbers * 3;
  let total = evenNumbers + oddNumbers;

  if (total % 10 === 0) {
    checkDigits = 0;
  } else {
    let next_multiple = total + (10 - (total % 10));

    checkDigits = next_multiple - total;
  }

  return checkDigits;
}

function generateEan13(prefix = null) {
  // Generate random
  let code = '' + random(100000000000, 999999999999); // 12 chars long

  if (prefix) {
    code = prefix.code;
    code = code.slice(0, -prefix.length);
  }

  // Get latest digit
  code += getCheckDigit(code);

  return code;
}

function generatePassword() {
  let characters =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let passwordLength = 8;
  let password = '';
  for (let i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * characters.length);
    password += characters.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

export default {
  getCheckDigit,
  generateEan13,
  generatePassword
};
