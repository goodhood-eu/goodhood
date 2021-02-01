import { assert } from 'chai';


import {
  getOptions,
} from './utils';

describe('ui/advertisement/utils', () => {
  it('getOptions', () => {
    const values = {
      a: 'test',
      b: '',
      c: 2,
      d: 0,
      e: false,
      f: undefined,
      g: null,
    };

    const expected = {
      a: 'test',
      c: 2,
    };

    assert.deepEqual(getOptions(), {}, 'empty call');
    assert.deepEqual(getOptions(values), expected, 'filtered falsy');
  });
});
