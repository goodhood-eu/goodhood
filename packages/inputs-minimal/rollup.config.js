import pkg from './package.json';
import getConfig from '../../presets/react/rollup.config';

export default getConfig(pkg, __dirname);
