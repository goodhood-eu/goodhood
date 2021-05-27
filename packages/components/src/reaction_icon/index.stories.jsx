import { select, withKnobs } from '@root/.preview/src/modules/knobs';
import ReactionIcon from './index';
import { REACTIONS } from '../constants';

export default { title: 'ReactionIcon', component: ReactionIcon, decorators: [withKnobs] };

export const Default = () => {
  const reaction = select('reaction', REACTIONS, REACTIONS[0]);

  return <ReactionIcon reaction={reaction} />;
};
