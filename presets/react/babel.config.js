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
