import { assert } from 'chai';
import { getPercentageString } from './utils';

describe('progress_bar', () => {
  describe('getPercentageString', () => {
    it('returns the number concatinated with a percentage', () => {
      assert.deepEqual(getPercentageString(45), '45%', 'regular case');
    });
    it('returns the number concatinated with a percentage', () => {
      assert.deepEqual(getPercentageString('45'), '45%', 'regular case');
    });
    it('returns the number concatinated with a percentage', () => {
      assert.deepEqual(getPercentageString('45%'), '45%', 'regular case');
    });
  });
});
