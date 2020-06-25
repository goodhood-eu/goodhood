module.exports = {
  plugins: [
    { removeViewBox: false },
    { removeXMLNS: true },
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
