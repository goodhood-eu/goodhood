import path from 'path';
import VirtualModulePlugin from 'webpack-virtual-modules';
import sass from 'sass';
import sassFunctions from 'sass-functions';

// import globBase from 'glob-base';
// import { makeRe } from 'micromatch';
//
// // https://github.com/storybookjs/storybook/blob/v5.3.19/lib/core/src/server/preview/to-require-context.js
// const isObject = (val) => val != null && typeof val === 'object' && Array.isArray(val) === false;
// export const toRequireContext = (input) => {
//   switch (true) {
//     case typeof input === 'string': {
//       const { base, glob } = globBase(input);
//       const regex = makeRe(glob)
//         .toString()
//         // webpack prepends the relative path with './'
//         .replace(/^\/\^/, '/^\\.\\/')
//         .replace(/\?:\^/g, '?:');
//
//       return { path: base, recursive: glob.startsWith('**'), match: regex };
//     }
//     case isObject(input): {
//       return input;
//     }
//
//     default: {
//       throw new Error('the provided input cannot be transformed into a require.context');
//     }
//   }
// };
//
// // https://github.com/storybookjs/storybook/blob/v5.3.19/lib/core/src/server/preview/to-require-context.js
// export const toRequireContextString = (input) => {
//   const { path: p, recursive: r, match: m } = toRequireContext(input);
//   return `require.context('${p}', ${r}, ${m})`;
// };

const stories = [
  // require('../src/dots/index.stories'),
];
// const virtualModulePlugin = stories && stories.length && new VirtualModulePlugin({
//   [path.resolve(path.join(__dirname, 'generated-entry.js'))]: `
//               import { configure } from '@storybook/react';
//               module._StorybookPreserveDecorators = true;
//               configure([${stories.map(toRequireContextString).join(',')}
//               ], module);
//             `,
// });

const virtualModulePlugin = stories && stories.length && new VirtualModulePlugin({
  [path.resolve(path.join(__dirname, 'generated-entry.js'))]: `
              import { configure } from '@storybook/react';
              module._StorybookPreserveDecorators = true;
              configure([${stories.join(',')}
              ], module);
            `,
});

const ROOT_PKG_PATH = path.resolve(path.join(__dirname, '../../'));
const rootPath = path.resolve(path.join(__dirname), '../');

const fileLoaderRules = [{
  test: /\.(jpe?g|png|gif|woff2?|ttf)$/,
  use: 'file-loader',
}]

const getStyleLoaders = ({ modules }) => (
  [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: modules && {
          localIdentName: '[path][name]--[local]__[hash:base64:5]',
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: sass,

        sassOptions: {
          includePaths: [
            path.join(rootPath, 'node_modules/'),
            path.join(ROOT_PKG_PATH, 'node_modules/'),
          ],
          functions: sassFunctions({ sass }),
        },
      },
    },
  ].filter(Boolean)
);

const serverConfig = {
  mode: 'development',
  entry: {
    prerender: path.join(__dirname, 'src/middleware.jsx'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      ...([
        {
          test: /\.scss$/,
          sideEffects: false,
          exclude: /\.module\.scss$/,
          use: getStyleLoaders({ modules: false, extract: false }),
        },
        {
          test: /\.module\.scss$/,
          sideEffects: false,
          use: getStyleLoaders({ modules: true, extract: false }),
        },
      ])
    ],
  },
  plugins: [virtualModulePlugin].filter(Boolean),
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  optimization: {
    splitChunks: false,
  },
};

const clientConfig = {
  mode: 'development',
  entry: {
    client: [
      '/Users/peter/Documents/Business/nebenan.de/goodhood/node_modules/@storybook/core/dist/server/common/polyfills.js',
      '/Users/peter/Documents/Business/nebenan.de/goodhood/node_modules/@storybook/core/dist/server/preview/globals.js',
      '/Users/peter/Documents/Business/nebenan.de/goodhood/node_modules/@storybook/addon-docs/dist/frameworks/common/config.js',
      '/Users/peter/Documents/Business/nebenan.de/goodhood/node_modules/@storybook/addon-docs/dist/frameworks/react/config.js',
      path.join(__dirname, 'src/index.jsx'),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      ...([
        {
          test: /\.scss$/,
          sideEffects: false,
          exclude: /\.module\.scss$/,
          use: getStyleLoaders({ modules: false, extract: true }),
        },
        {
          test: /\.module\.scss$/,
          sideEffects: false,
          use: getStyleLoaders({ modules: true, extract: true }),
        },
      ]),
      ...fileLoaderRules,
    ],
  },
  plugins: [
    virtualModulePlugin,
  ].filter(Boolean),
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: false,
  },
};

module.exports = [serverConfig, clientConfig];
