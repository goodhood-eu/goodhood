import svgr from '@svgr/rollup';
import pkg from './package.json';
import getConfig from '../../presets/react/rollup.config';
import globImport from 'rollup-plugin-glob-import';
import path from "path";
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const baseConfig = getConfig(pkg, __dirname);

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins.filter(({ name }) => name !== 'glob-import'),
    svgr(

    ),
    globImport({
      format: 'default',
      rename: (name, id) => {
        if (name) return name;

        if (/\.svg$/.test(id)) {
          const groupname = path.basename(path.dirname(id));
          const basename = path.basename(id, '.svg');

          return [
            upperFirst(camelCase(basename)),
            groupname,
          ].join('');
        }

        // not supported
        return null;
      }
    }),
  ],
};
