if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date;
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: [
    'packages/**/dist/**',
  ],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },

  'appId': 'com.lab2view.erp',
  'productName': 'Lab2view ERP',
  'copyright': 'Copyright © 2022 lab2view',

  'win': {
    'target': [
      'squirrel',
      'nsis',
      'exe',
    ],
  },

  // @see https://www.electron.build/configuration/linux
  // 'linux': {
  //   'target': [
  //     'zip',
  //     'AppImage',
  //     'deb',
  //     //  'snap',
  //   ],
  // },

  // 'mac': {
  //   'target': [
  //     'zip',
  //     'dmg',
  //   ],
  // },
};

module.exports = config;
