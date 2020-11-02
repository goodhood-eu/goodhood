import React from 'react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import Label from './index';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
} from '../feature_alert';

const TOOLTIP_PLACEHOLDER = 'Design is like a joke.';

export default { title: 'Feature Alert Label', component: Label, decorators: [withKnobs] };

const options = {
  top: POSITION_TOP,
  bottom: POSITION_BOTTOM,
  left: POSITION_LEFT,
  right: POSITION_RIGHT,
};

export const Default = () => (
  <div>
    <Label label={text('Label text', 'label')} position={select('Label position', options, POSITION_TOP)}>
      {TOOLTIP_PLACEHOLDER}
    </Label>
  </div>
);
