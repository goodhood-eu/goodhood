import { addons } from '@storybook/addons';
import setup from '../../../presets/react/storybook/manager';
import pkg from "../package.json";

setup({ pkg, addons });
