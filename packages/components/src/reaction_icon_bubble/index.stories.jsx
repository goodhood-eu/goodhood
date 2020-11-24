import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import ReactionIconBubble from './index';
import { REACTIONS } from '../constants';

export default { title: 'ReactionIconBubble', component: ReactionIconBubble, decorators: [withKnobs] };

export const Default = () => {
  const reaction = select('reaction', REACTIONS, REACTIONS[0]);
  const size = select('size', [20, 24], 20);

  return <ReactionIconBubble reaction={reaction} size={size} />;
};
