import React from 'react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { REACTIONS } from '../constants';
import ReactionsRow from './index';

export default { title: 'ReactionsRow', component: ReactionsRow, decorators: [withKnobs] };


export const Default = () => {
  const reactions = REACTIONS.reduce((acc, reaction, index) => ({
    ...acc,
    [reaction]: number(reaction, index),
  }), {});

  return (
    <ReactionsRow
      reactions={reactions}
      onClick={action('clicked')}
      withCounter={boolean('withCounter', true)}
    />
  );
};
