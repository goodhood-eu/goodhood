import { create } from '@storybook/theming/create';

const getTheme = (name) => create({
  base: 'light',
  brandTitle: name,
});

export default ({ pkg, addons }) => {
  addons.setConfig({ theme: getTheme(pkg.name) });
};
