import { assert } from 'chai';
import { addNumbers, getPackageName, getRootPackageName } from './utils';

describe('utils', () => {
  it('addNumbers', () => {
    assert.equal(addNumbers(1, 2), 3);
  });

  it('getRootPackageName', () => {
    assert.equal(getRootPackageName(), 'goodhood', 'alias works');
  });

  it('getPackageName', () => {
    assert.equal(getPackageName(), '@goodhood/your-package', 'alias works');
  });
});
