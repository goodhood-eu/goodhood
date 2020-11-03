import React from 'react';
import { text, select, boolean, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import {
  Tooltip,
  TRIGGER_HOVER,
  TRIGGER_CLICK,
  TRIGGER_DELAYED,
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
} from './index';
import styles from './index.stories.module.scss';

const TOOLTIP_PLACEHOLDER = 'Design is like a joke. If it needs explaining, it\'s probably bad.';

export default { title: 'Feature Alert', component: Tooltip, decorators: [withKnobs] };

const POSITIONING_OPTIONS = {
  top: POSITION_TOP,
  bottom: POSITION_BOTTOM,
  left: POSITION_LEFT,
  right: POSITION_RIGHT,
};

const TRIGGER_OPTIONS = {
  hover: TRIGGER_HOVER,
  click: TRIGGER_CLICK,
  delayed: TRIGGER_DELAYED,
};

export const Default = () => (
  <div className={styles.container}>
    <Tooltip
      content={text('Tooltip text', TOOLTIP_PLACEHOLDER)}
      position={select('Position', POSITIONING_OPTIONS, POSITION_TOP)}
      fallbackPosition={select('Fallback position', POSITIONING_OPTIONS, POSITION_TOP)}
      trigger={select('Trigger', TRIGGER_OPTIONS, TRIGGER_HOVER)}
      closeIcon={boolean('Has close icon', true)}
      defaultOpen={boolean('Is default open', false)}
      onOpen={action('opened')}
      onClose={action('closed')}

      key={boolean('Reload tooltip', false)}
    >
      {`Tooltip position: ${select('Position', POSITIONING_OPTIONS, POSITION_TOP)}`}
    </Tooltip>
  </div>
);
