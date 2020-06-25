module.exports = {
  plugins: [
    { removeViewBox: false },
    { removeDimensions: true },
    { convertColors: { currentColor: true } },
  ],
  js2svg: {
    pretty: true,
  },
  svg2js: {
    pretty: true,
  },
};
