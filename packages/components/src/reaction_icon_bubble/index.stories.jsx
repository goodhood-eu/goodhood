import { select } from '@root/.preview/src/modules/knobs';
import ReactionIconBubble from './index';
import { REACTIONS } from '../constants';

export default { title: 'ReactionIconBubble', component: ReactionIconBubble };

export const Default = () => {
  const reaction = select('reaction', REACTIONS, REACTIONS[0]);

  return <ReactionIconBubble reaction={reaction} />;
};
