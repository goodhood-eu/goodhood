import url from '@rollup/plugin-url';
import pkg from './package.json';
import getConfig from '../../presets/react/rollup.config';

const config = getConfig(pkg, __dirname);
export default {
  ...config,

  // needed for mapbox-gl to work
  context: 'this',

  plugins: [
    ...config.plugins,
    url(),
  ],
};
