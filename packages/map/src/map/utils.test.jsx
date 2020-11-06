import { assert } from 'chai';
import {
  mergeLayersBounds,
  isFilledArray,
  isSinglePoint,
  getMapOptions,
  getFitBoundsOptions,
} from './utils';


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

  describe('isSinglePoint', () => {
    it('should return false if empty value is passed', () => {
      assert.isFalse(isSinglePoint(), 'empty');
      assert.isFalse(isSinglePoint([]), 'empty array');
    });

    it('should return true if bouding box is only one point', () => {
      assert.isTrue(isSinglePoint([[0, 0], [0, 0]]));
    });

    it('should return false if bouding box covers some area', () => {
      assert.isFalse(isSinglePoint([[0, 0], [1, 1]]));
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

    it('should set optional options', () => {
      const result = getMapOptions({
        bounds: [[0, 0], [1, 1]],
        fitPadding: 5,
      });

      assert.deepNestedInclude(result, {
        bounds: [[0, 0], [1, 1]],
        fitBoundsOptions: { padding: 5 },
      });
    });

    it('should set maxZoom level if bounds is only one point', () => {
      const resultA = getMapOptions({
        bounds: [[0, 0], [0, 0]],
      });

      const resultB = getMapOptions({
        bounds: [[0, 0], [1, 1]],
      });

      assert.equal(resultA.maxZoom, 14, 'bounds is single point');
      assert.isUndefined(resultB.maxZooom, 'if bounds covers some area do not set zoom level');
    });
  });

  describe('getFitBoundsOptions', () => {
    it('should return bounds', () => {
      assert.deepEqual(getFitBoundsOptions({ bounds: [[0, 0], [1, 1]] })[0], [[0, 0], [1, 1]]);
    });

    it('should set passed options', () => {
      assert.deepEqual(getFitBoundsOptions({ animate: true, fitPadding: 3 })[1], {
        animate: true,
        padding: 3,
      });
    });

    it('should set maxZoom if bounding box is a single point', () => {
      const resultA = getFitBoundsOptions({
        bounds: [[0, 0], [0, 0]],
      })[1];

      const resultB = getFitBoundsOptions({
        bounds: [[0, 0], [1, 1]],
      })[1];

      assert.equal(resultA.maxZoom, 14, 'bounds is single point');
      assert.isUndefined(resultB.maxZooom, 'if bounds covers some area do not set zoom level');
    });
  });
});
