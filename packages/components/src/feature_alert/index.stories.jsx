import { useState } from 'react';
import { text, select, boolean, button, withKnobs } from '@root/.preview/src/modules/knobs';
import { action } from '@root/.preview/src/modules/actions';
import FeatureAlert from './index';
import {
  TOOLTIP_POSITION_TOP,
  TOOLTIP_POSITION_BOTTOM,
  TOOLTIP_POSITION_LEFT,
  TOOLTIP_POSITION_RIGHT,
  TOOLTIP_TRIGGER_HOVER,
  TOOLTIP_TRIGGER_CLICK,
  TOOLTIP_TRIGGER_DELAYED,
} from '../base_tooltip';
import styles from './index.stories.module.scss';

export default { title: 'Feature Alert', component: FeatureAlert, decorators: [withKnobs] };

const TOOLTIP_PLACEHOLDER = 'Design is like a joke. If it needs explaining, it\'s probably bad.';

const POSITIONING_OPTIONS = {
  top: TOOLTIP_POSITION_TOP,
  bottom: TOOLTIP_POSITION_BOTTOM,
  left: TOOLTIP_POSITION_LEFT,
  right: TOOLTIP_POSITION_RIGHT,
};

const TRIGGER_OPTIONS = {
  hover: TOOLTIP_TRIGGER_HOVER,
  click: TOOLTIP_TRIGGER_CLICK,
  delayed: TOOLTIP_TRIGGER_DELAYED,
};


export const Default = () => {
  const [key, setKey] = useState(true);
  const handleRemount = () => { setKey((oldKey) => !oldKey); };
  button('Remount', handleRemount);

  const position = select('Position', POSITIONING_OPTIONS, TOOLTIP_POSITION_TOP);
  return (
    <div className={styles.container}>
      <FeatureAlert
        content={text('Tooltip text', TOOLTIP_PLACEHOLDER)}
        position={position}
        trigger={select('Trigger', TRIGGER_OPTIONS, TOOLTIP_TRIGGER_HOVER)}
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
