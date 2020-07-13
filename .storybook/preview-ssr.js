import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addParameters } from '@storybook/client-api';
import 'nebenan-ui-kit/styles.scss';
import './preview.scss';

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
