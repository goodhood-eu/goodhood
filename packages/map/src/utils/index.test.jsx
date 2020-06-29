import { assert } from 'chai';
import { getID } from './index';


describe('utils', () => {
  describe('getID', () => {
    it('should return hexadecimal number', () => {
      const segmentRegex = /^[a-f0-9]+$/;
      assert.match(getID(), segmentRegex);
    });

    it('should return different data on each call', () => {
      assert.notEqual(getID(), getID());
    });

    it('should return string of length 8', () => {
      assert.equal(getID().length, 8);
    });
  });
});
