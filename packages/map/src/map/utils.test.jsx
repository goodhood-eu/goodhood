import { assert } from 'chai';
import { mergeChildrenBounds, isFilledArray } from './utils';


describe('map/utils', () => {
  describe('isFilledArray', () => {
    it('should return true if non empty array was passed', () => {
      assert.isTrue(isFilledArray([1, 2]));
    });

    it('should return false if empty array was passed', () => {
      assert.isFalse(isFilledArray([]));
    });

    it('should return false it non array type was passed', () => {
      assert.isFalse(isFilledArray(1), 'number');
      assert.isFalse(isFilledArray(undefined), 'undefined');
      assert.isFalse(isFilledArray(null), 'null');
      assert.isFalse(isFilledArray('string'), 'string');
      assert.isFalse(isFilledArray({}), 'object');
    });
  });

  describe('mergeChildrenBounds', () => {
    it('should return undefined if empty array was passed', () => {
      assert.isUndefined(mergeChildrenBounds([]));
    });

    it('should flatten array on one level', () => {
      const data = [
        [[1, 2], [3, 4]],
        [[5, 6], [7, 8]],
      ];

      assert.deepEqual(mergeChildrenBounds(data), [[1, 2], [3, 4], [5, 6], [7, 8]]);
    });
  });
});
