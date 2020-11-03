import React from 'react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import Tooltip from './index';
import styles from './index.stories.module.scss';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
} from '../feature_alert';

const TOOLTIP_PLACEHOLDER = 'Design is like a joke.';

export default { title: 'Tooltip', component: Tooltip, decorators: [withKnobs] };

const POSITIONING_OPTIONS = {
  top: POSITION_TOP,
  bottom: POSITION_BOTTOM,
  left: POSITION_LEFT,
  right: POSITION_RIGHT,
  default: '',
};

export const Default = () => (
  <div className={styles.container}>
    <Tooltip
      type={select('Tooltip position', POSITIONING_OPTIONS, POSITION_TOP)}
      text={text('Tooltip text', TOOLTIP_PLACEHOLDER)}
    >
      {`Tooltip position: ${select('Tooltip position', POSITIONING_OPTIONS, POSITION_TOP)}`}
    </Tooltip>
  </div>
);
