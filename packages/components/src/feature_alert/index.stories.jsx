import React from 'react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
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

const options = {
  top: POSITION_TOP,
  bottom: POSITION_BOTTOM,
  left: POSITION_LEFT,
  right: POSITION_RIGHT,
};

export const Default = () => (
  <div className={styles.container}>
    <Tooltip
      content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} position={select('Position', options, POSITION_TOP)}
      trigger={TRIGGER_HOVER} closeIcon
    >
      {`Tooltip position: ${select('Position', options, POSITION_TOP)}`}
    </Tooltip>
  </div>
);

export const AppearanceExamples = () => (
  <div className={styles.container}>
    <div className={styles.element}>
      <Tooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)}>
        NO TRIGGER
      </Tooltip>
    </div>
    <div className={styles.element}>
      <Tooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} defaultOpen closeIcon>
        defaultOpen
      </Tooltip>
    </div>
    <div className={styles.element}>
      <Tooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} trigger={TRIGGER_HOVER}>
        {TRIGGER_HOVER}
      </Tooltip>
    </div>
    <div className={styles.element}>
      <Tooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} trigger={TRIGGER_CLICK}>
        {TRIGGER_CLICK}
      </Tooltip>
    </div>
    <div className={styles.element}>
      <Tooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} trigger={TRIGGER_DELAYED}>
        {TRIGGER_DELAYED}
      </Tooltip>
    </div>
  </div>
);
