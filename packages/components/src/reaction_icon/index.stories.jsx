import React from 'react';
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs';
import ReactionIcon from './index';
import { REACTION_SIZE_M, REACTIONS } from '../constants';

export default { title: 'ReactionIcon', component: ReactionIcon, decorators: [withKnobs] };

export const Default = () => {
  const reaction = select('reaction', REACTIONS, REACTIONS[0]);
  const colorize = boolean('with color', false);
  const size = number('size', REACTION_SIZE_M);

  return <ReactionIcon reaction={reaction} colorize={colorize} size={size} />;
};
