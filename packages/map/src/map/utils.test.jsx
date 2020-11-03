import { assert } from 'chai';
import { mergeLayersBounds, isFilledArray, getMapOptions } from './utils';


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

  describe('mergeLayersBounds', () => {
    it('should return undefined if empty array was passed', () => {
      assert.isUndefined(mergeLayersBounds([]));
    });

    it('should flatten array on one level', () => {
      const data = [
        [[1, 2], [3, 4]],
        [[5, 6], [7, 8]],
      ];

      assert.deepEqual(mergeLayersBounds(data), [[1, 2], [3, 4], [5, 6], [7, 8]]);
    });
  });

  describe('getMapOptions', () => {
    it('should set default options', () => {
      assert.deepNestedInclude(getMapOptions({}), {
        scrollZoom: false,
        dragRotate: false,
        pitchWithRotate: false,
      });
    });

    it('should enable/disable interactivity if map is locked/unlocked', () => {
      assert.isTrue(getMapOptions({ locked: false, isMobile: false }).interactive, 'locked false');
      assert.isFalse(getMapOptions({ locked: true, isMobile: false }).interactive, 'locked true');

      assert.isTrue(getMapOptions({ locked: true, lockedMobile: false, isMobile: true }).interactive, 'locked false [mobile]');
      assert.isFalse(getMapOptions({ locked: false, lockedMobile: true, isMobile: true }).interactive, 'locked true [mobile]');
    });

    it('should show/hide attribution', () => {
      assert.isTrue(getMapOptions({ noAttribution: false }).attributionControl, 'noAttribution false');
      assert.isFalse(getMapOptions({ noAttribution: true }).attributionControl, 'noAttribution true');
    });

    it('should set container', () => {
      const node = {};
      assert.equal(getMapOptions({ node }).container, node);
    });

    it('should set style if credentials are passed', () => {
      const { style } = getMapOptions({ credentials: { map_id: 'abcf123', key: 'TOKEN_KEY' } });
      assert.include(style, 'abcf123', 'id is set');
      assert.include(style, 'TOKEN_KEY', 'key is set');
    });

    it('should set optinal options', () => {
      const result = getMapOptions({
        maxZoom: 10,
        bounds: [[0, 0]],
        fitPadding: 5,
      });

      assert.deepNestedInclude(result, {
        maxZoom: 10,
        bounds: [[0, 0], [0, 0]],
        fitBoundsOptions: { padding: 5 },
      });
    });
  });
});
