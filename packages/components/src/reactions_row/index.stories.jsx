import { boolean, number } from '@root/.preview/src/modules/knobs';
import { action } from '@root/.preview/src/modules/actions';
import { REACTIONS } from '../constants';
import ReactionsRow from './index';

export default { title: 'ReactionsRow', component: ReactionsRow };


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
      limit={number('limit', REACTIONS.length)}
    />
  );
};

export const ZeroReactions = () => {
  const reactions = { thankyou: 0, love: 0, good_idea: 0, bravo: 0 };
  return (
    <ReactionsRow
      reactions={reactions}
      withNullableCounter={boolean('withNullableCounter', false)}
    />
  );
};
