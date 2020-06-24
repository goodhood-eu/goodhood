import { assert } from 'chai';
import { addNumbers } from './utils';

describe('utils', () => {
  it('addNumbers', () => {
    assert.equal(addNumbers(1, 2), 3);
  });
});
