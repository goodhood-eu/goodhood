import React, { useState } from 'react';
import { text, select, boolean, button, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import FeatureAlert from './index';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
  TRIGGER_HOVER,
  TRIGGER_CLICK,
  TRIGGER_DELAYED,
} from '../base_tooltip/constants';
import styles from './index.stories.module.scss';

export default { title: 'Feature Alert', component: FeatureAlert, decorators: [withKnobs] };

const TOOLTIP_PLACEHOLDER = 'Design is like a joke. If it needs explaining, it\'s probably bad.';

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


export const Default = () => {
  const [key, setKey] = useState(true);
  const handleRemount = () => { setKey((oldKey) => !oldKey); };
  button('Remount', handleRemount);

  const position = select('Position', POSITIONING_OPTIONS, POSITION_TOP);
  return (
    <div className={styles.container}>
      <FeatureAlert
        content={text('Tooltip text', TOOLTIP_PLACEHOLDER)}
        position={position}
        trigger={select('Trigger', TRIGGER_OPTIONS, TRIGGER_HOVER)}
        closeIcon={boolean('Has close icon', true)}
        defaultOpen={boolean('Is default open', false)}
        onOpen={action('opened')}
        onClose={action('closed')}

        key={key}
      >
        {`Tooltip position: ${position}`}
      </FeatureAlert>
    </div>
  );
};
