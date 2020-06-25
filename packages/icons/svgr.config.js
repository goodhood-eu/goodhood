module.exports = {
  svgo: true,
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  jsx: {
    babelConfig: {
      plugins: [
        ['@babel/plugin-transform-react-jsx', {
          useBuiltIns: true,
        }],
      ],
    },
  },
};
