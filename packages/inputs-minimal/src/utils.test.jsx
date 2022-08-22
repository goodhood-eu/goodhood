import { assert } from 'chai';
import { pickDataAttributes } from './utils';

describe('utils', () => {
  it('pickDataAttributes', () => {
    assert.deepEqual(
      pickDataAttributes({ bla: 1, blubb: 2, 'data-test-id': true, 'data-yeah': true, datablubb: 'lol' }),
      {
        'data-test-id': true,
        'data-yeah': true,
      },
    );
  });
});
