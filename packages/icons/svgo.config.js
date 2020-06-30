module.exports = {
  plugins: [
    { removeViewBox: false },
    { removeRasterImages: true },
    { convertColors: { currentColor: true } },
  ],
  js2svg: {
    pretty: true,
  },
  svg2js: {
    pretty: true,
  },
};
