import { assert } from 'chai';
import { getReactionsCount, getSortedReactionKeys } from './utils';
import { REACTION_GOOD_IDEA, REACTION_LOVE, REACTION_THANK_YOU } from '../constants';

describe('ui/reaction_counter/utils', () => {
  it('getSortedReactionKeys', () => {
    assert.deepEqual(
      getSortedReactionKeys({
        [REACTION_LOVE]: 1, [REACTION_THANK_YOU]: 5, [REACTION_GOOD_IDEA]: 2,
      }),
      [REACTION_LOVE, REACTION_GOOD_IDEA, REACTION_THANK_YOU],
    );
  });

  it('getReactionsCount', () => {
    assert.equal(
      getReactionsCount({ [REACTION_LOVE]: 2, [REACTION_THANK_YOU]: 1 }),
      3,
    );
  });
});
