import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';
import pkg from 'current-pkg/package.json';

const getTheme = (name) => create({
  base: 'light',
  brandTitle: name,
});

addons.setConfig({ theme: getTheme(pkg.name) });
