import fs from 'fs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import resolve from '@rollup/plugin-node-resolve';
import sassFunctions from 'sass-functions';
import del from 'rollup-plugin-delete';
import path from 'path';
import sass from 'sass';
import globImport from 'rollup-plugin-glob-import';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import kebapCase from 'lodash/kebabCase';
import acornJsx from 'acorn-jsx';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';

const ROOT_PKG_PATH = path.join(__dirname, '../../');

const move = (source, target) => ({
  writeBundle() {
    if (!fs.existsSync(source) || fs.existsSync(target)) return;

    fs.renameSync(source, target);
  },
});

export default (pkg, pkgPath) => ({
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
      exports: 'named',
    },
  ],
  plugins: [
    commonjs(),
    del({
      targets: [
        path.join(pkgPath, 'lib/*'),
        path.join(pkgPath, 'styles.css'),
      ],
    }),
    alias({
      entries: [
        { find: '@', replacement: pkgPath },
        { find: '@root', replacement: ROOT_PKG_PATH },
      ],
    }),
    peerDepsExternal(),
    postcss({
      extract: 'styles.css',
      modules: {
        globalModulePaths: [/node_modules/],
        generateScopedName: `${kebapCase(pkg.name)}__[hash:base64:5]`,
      },
      use: [['sass', {
        includePaths: [
          path.join(pkgPath, 'node_modules/'),
          path.join(ROOT_PKG_PATH, 'node_modules/'),
        ],
        functions: sassFunctions({ sass }),
        sourceComments: true,
      }]],
      plugins: [
        postcssPresetEnv(),
      ],
    }),
    babel({
      babelHelpers: 'runtime',
      rootMode: 'upward',
      exclude: [
        /node_modules/,
      ],
    }),
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.json'],
    }),
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
    url(),
    svgr(),
    move(path.join(pkgPath, 'lib/styles.css'), path.join(pkgPath, 'styles.css')),
  ],
});
