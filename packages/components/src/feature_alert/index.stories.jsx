import React from 'react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import {
  Tooltip as FATooltip,
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

export default { title: 'Feature Alert', component: FATooltip, decorators: [withKnobs] };

const options = {
  top: POSITION_TOP,
  bottom: POSITION_BOTTOM,
  left: POSITION_LEFT,
  right: POSITION_RIGHT,
};

export const Default = () => (
  <div className={styles.container}>
    <div className={styles.standalone}>
      <div>
        <FATooltip
          content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} position={select('Position', options, POSITION_TOP)}
          trigger={TRIGGER_HOVER} closeIcon
        >
          {`Tooltip position: ${select('Position', options, POSITION_TOP)}`}
        </FATooltip>
      </div>
    </div>

    <hr />

    <div>
      <div className={styles.element}>
        <FATooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)}>
          NO TRIGGER
        </FATooltip>
      </div>
      <div className={styles.element}>
        <FATooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} defaultOpen closeIcon>
          defaultOpen
        </FATooltip>
      </div>
      <div className={styles.element}>
        <FATooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} trigger={TRIGGER_HOVER}>
          {TRIGGER_HOVER}
        </FATooltip>
      </div>
      <div className={styles.element}>
        <FATooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} trigger={TRIGGER_CLICK}>
          {TRIGGER_CLICK}
        </FATooltip>
      </div>
      <div className={styles.element}>
        <FATooltip content={text('Tooltip text', TOOLTIP_PLACEHOLDER)} trigger={TRIGGER_DELAYED}>
          {TRIGGER_DELAYED}
        </FATooltip>
      </div>
    </div>
  </div>
);
