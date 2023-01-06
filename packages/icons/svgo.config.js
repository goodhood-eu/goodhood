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
          cleanupIds: {
            preservePrefixes: ['goodhood_'], // only keeps ids which are prefixed
          },
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
