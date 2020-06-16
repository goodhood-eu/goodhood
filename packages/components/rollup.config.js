import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import sassFunctions from 'sass-functions';
import del from 'rollup-plugin-delete';
import path from 'path';
import sass from 'sass';
import pkg from './package.json';

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    del({
      targets: path.join(__dirname, 'lib/*'),
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
