import React from 'react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import Tooltip from './index';
import styles from './index.stories.module.scss';
import {
  TOOLTIP_POSITION_TOP,
  TOOLTIP_POSITION_BOTTOM,
  TOOLTIP_POSITION_LEFT,
  TOOLTIP_POSITION_RIGHT,
} from '../base_tooltip';

const TOOLTIP_PLACEHOLDER = 'Design is like a joke.';

export default { title: 'Tooltip', component: Tooltip, decorators: [withKnobs] };

const POSITIONING_OPTIONS = {
  top: TOOLTIP_POSITION_TOP,
  bottom: TOOLTIP_POSITION_BOTTOM,
  left: TOOLTIP_POSITION_LEFT,
  right: TOOLTIP_POSITION_RIGHT,
  default: '',
};

export const Default = () => {
  const position = select('Tooltip position', POSITIONING_OPTIONS, TOOLTIP_POSITION_TOP);

  return (
    <div className={styles.container}>
      <Tooltip
        position={position}
        bubble={text('Tooltip text', TOOLTIP_PLACEHOLDER)}
      >
        {`Tooltip position: ${position}`}
      </Tooltip>
    </div>
  );
};
