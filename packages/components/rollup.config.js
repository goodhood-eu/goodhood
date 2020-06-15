import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import sassFunctions from 'sass-functions';
import sassGlobImporter from 'node-sass-glob-importer';
import del from 'rollup-plugin-delete';
import path from 'path';
import sass from 'sass';
// eslint-disable-next-line import/extensions
import pkg from './package.json';

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    del({
      targets: path.join(pkg.module, '../*'),
    }),
    peerDepsExternal(),
    postcss({
      extract: true,
      modules: true,
      use: [['sass', {
        includePaths: [
          `${__dirname}/node_modules`,
        ],
        functions: sassFunctions({ sass }),
        importer: sassGlobImporter(),
        outputStyle: 'expanded',
        sourceComments: true,
      }]],
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
    resolve({ browser: true, extensions: ['.js', '.jsx', '.json'] }),
    json(),
  ],
};
