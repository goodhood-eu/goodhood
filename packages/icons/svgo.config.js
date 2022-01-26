module.exports = {
  plugins: [
    'removeRasterImages',
    {
      name: 'convertColors',
      params: {
        currentColor: true,
      },
    },
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
  ],
  js2svg: {
    pretty: true,
  },
  svg2js: {
    pretty: true,
  },
};
