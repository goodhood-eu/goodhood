import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import 'nebenan-ui-kit/styles.scss';
import './preview.scss';

export const setup = ({ clientApi: { addParameters } }) => {
  addParameters({
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  });
};
