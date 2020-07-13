const PKG_PATH = process.cwd();
const ROOT_PKG_PATH = __dirname;

module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
  ],
  plugins: [
    'transform-node-env-inline',
    'transform-react-remove-prop-types',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-proposal-json-strings',
    ['module-resolver', {
      alias: {
        '@': PKG_PATH,
        '@root': ROOT_PKG_PATH,
      },
    }],
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: '3',
        }],
      ],
    },
  },
};
