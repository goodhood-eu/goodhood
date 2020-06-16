import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import sassFunctions from 'sass-functions';
import del from 'rollup-plugin-delete';
import path from 'path';
import sass from 'sass';
import globImport from 'rollup-plugin-glob-import';
import camelCase from 'lodash/camelCase';
import copy from 'rollup-plugin-copy';
import upperFirst from 'lodash/upperFirst';
import acornJsx from 'acorn-jsx';
import pkg from './package.json';

const toFileExtension = (filepath, ext) => {
  const { dir, name } = path.parse(filepath);

  return path.join(dir, `${name}.${ext}`);
};

export default {
  input: 'src/index.jsx',
  acorn: { jsx: true },
  acornInjectPlugins: [acornJsx()],
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
      targets: [
        path.join(__dirname, 'lib/*'),
        path.join(__dirname, 'styles.css'),
      ],
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
    globImport({
      format: 'mixed',
      rename: (name, id) => {
        if (name) return name;
        if (/index\.js(x?)$/.test(id)) {
          const dirname = path.basename(path.dirname(id));
          return upperFirst(camelCase(dirname));
        }

        // not supported
        return null;
      },
    }),
    json(),
    copy({
      hook: 'writeBundle',
      targets: [
        {
          src: path.join(__dirname, toFileExtension(pkg.main, 'css')),
          dest: __dirname,
          rename: 'styles.css',
        },
      ],
    }),
  ],
};
