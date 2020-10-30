import { assert } from 'chai';
import { getItemIndexForPosition, isInsideTapBounds } from './utils';

const POSITIONS = [0, 20, 40, 60];
const BAR_POSITION = { top: 50, height: 30 };

describe('ui/reaction_selection_menu/utils', () => {
  describe('isInsideTapBounds', () => {
    it('true if horizontally and vertically inside bounds', () => {
      assert.isTrue(isInsideTapBounds(
        { clientX: 0, clientY: 0 },
        { clientX: 20, clientY: 20 },
        21,
      ));
    });

    it('false if horizontally outside bounds', () => {
      assert.isFalse(isInsideTapBounds(
        { clientX: 0, clientY: 0 },
        { clientX: 20, clientY: 22 },
        21,
      ));
    });

    it('false if vertically outside bounds', () => {
      assert.isFalse(isInsideTapBounds(
        { clientX: 0, clientY: 0 },
        { clientX: 22, clientY: 20 },
        21,
      ));
    });
  });

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
