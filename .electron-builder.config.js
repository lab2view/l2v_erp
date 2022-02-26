/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: ['packages/**/dist/**'],
  asar: false,
  extends: null,
  extraFiles: [
    {
      from: 'packages/renderer/src/assets',
      to: 'resources/app/packages/renderer/dist/src/assets',
      filter: ['**/*'],
    },
  ],
  extraMetadata: {
    version: require('electron').version,
  },
  win: {
    target: ['nsis', 'squirrel'],
  },
};

module.exports = config;
