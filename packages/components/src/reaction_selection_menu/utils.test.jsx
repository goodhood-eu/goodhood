import { assert } from 'chai';
import { getItemIndexForPosition } from './utils';

const POSITIONS = [0, 20, 40, 60];
const BAR_POSITION = { top: 50, height: 30 };

describe('ui/reaction_selection_menu/utils', () => {
  describe('getItemIndexForPosition', () => {
    it('null if above items', () => {
      assert.isNull(
        getItemIndexForPosition(POSITIONS, BAR_POSITION, { x: 41, y: 19 }),
      );
    });

    it('null if below items', () => {
      assert.isNull(
        getItemIndexForPosition(POSITIONS, BAR_POSITION, { x: 41, y: 120 }),
      );
    });

    it('index if above items but inside threshold', () => {
      assert.equal(
        getItemIndexForPosition(POSITIONS, BAR_POSITION, { x: 41, y: 21 }),
        2,
      );
    });

    it('index if below items but inside threshold', () => {
      assert.equal(
        getItemIndexForPosition(POSITIONS, BAR_POSITION, { x: 41, y: 100 }),
        2,
      );
    });

    it('index if directly pointing to item', () => {
      assert.equal(
        getItemIndexForPosition(POSITIONS, BAR_POSITION, { x: 21, y: 65 }),
        1,
      );
    });
  });
});
