import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import 'nebenan-ui-kit/styles.scss';
import './preview.scss';

export default ({ clientApi: { addParameters } }) => {
  addParameters({
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  });
};
