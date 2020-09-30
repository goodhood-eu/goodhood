import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addParameters } from '@storybook/client-api';
import 'nebenan-ui-kit/styles.scss';
import './preview.scss';

const requireAll = (requireContext) => requireContext.keys().map(requireContext);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

requireAll(require.context('@/.storybook/', false, /preview\.js$/));
