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
    version: require('electron').remote.app.getVersion(),
  },

  'win': {
    'target': [
      'squirrel',
      'nsis',
      'win32',
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
