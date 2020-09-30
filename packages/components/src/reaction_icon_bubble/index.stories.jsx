import React from 'react';
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs';
import ReactionIconBubble from './index';
import { REACTION_SIZE_M, REACTIONS } from '../constants';

export default { title: 'ReactionIconBubble', component: ReactionIconBubble, decorators: [withKnobs] };

export const Default = () => {
  const reaction = select('reaction', REACTIONS, REACTIONS[0]);
  const size = number('size', REACTION_SIZE_M);
  const isFilled = boolean('filled', false);
  const colored = boolean('with color', false);

  return (
    <ReactionIconBubble
      reaction={reaction}
      size={size}
      filled={isFilled}
      colored={colored}
    />
  );
};
