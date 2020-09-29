import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import pkg from './package.json';
import getConfig from '../../presets/react/rollup.config';

const config = getConfig(pkg, __dirname);
export default {
  ...config,

  plugins: [
    ...config.plugins,
    url(),
    svgr({ svgo: false }),
  ],
};
