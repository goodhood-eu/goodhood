import { assert } from 'chai';
import {
  getDefaultScale,
  getInsideBoundaries,
  getOffsetForNewScaleWithCustomAnchor,
  getScaledImageSize,
} from './utils';

describe('image_zoom_provider/utils', () => {
  describe('getScaledImageSize', () => {
    it('returns null for empty image', () => {
      assert.isNull(getScaledImageSize(null, 2));
    });

    it('return scaled image node size', () => {
      assert.deepEqual(
        getScaledImageSize({ naturalWidth: 200, naturalHeight: 300 }, 2),
        { width: 400, height: 600 },
      );
    });
  });

  describe('getDefaultScale', () => {
    it('never scale higher than the original', () => {
      assert.equal(
        getDefaultScale(
          { height: 100, width: 100 },
          { height: 10, width: 10 },
        ),
        1,
      );
    });

    it('fit image horizontally into preview', () => {
      assert.equal(
        getDefaultScale(
          { height: 100, width: 100 },
          { height: 200, width: 100 },
        ),
        0.5,
      );
    });

    it('fit image vertically into preview', () => {
      assert.equal(
        getDefaultScale(
          { height: 100, width: 100 },
          { height: 100, width: 400 },
        ),
        0.25,
      );
    });

    it('fit image vertically and horizontally into preview', () => {
      assert.equal(
        getDefaultScale(
          { height: 100, width: 100 },
          { height: 200, width: 400 },
        ),
        0.25,
      );
    });
  });

  describe('getInsideBoundaries', () => {
    context('preview is bigger than scaled view', () => {
      it('center in the middle', () => {
        assert.equal(
          getInsideBoundaries(300, 100, 123),
          100,
        );
      });
    });

    it('clamps possible offset values', () => {
      assert.equal(
        getInsideBoundaries(100, 300, -230),
        -200,
      );

      assert.equal(
        getInsideBoundaries(100, 300, -199),
        -199,
      );

      assert.equal(
        getInsideBoundaries(100, 300, 5),
        0,
      );

      assert.equal(
        getInsideBoundaries(100, 300, -1),
        -1,
      );
    });
  });

  it('getOffsetForNewScaleWithCustomAnchor', () => {
    assert.closeTo(
      getOffsetForNewScaleWithCustomAnchor({
        originalOffset: -5,
        prevScale: 0.3,
        scale: 0.5,
        previewLength: 200,
        anchor: 100,
      }),
      -75,
      0.01,
    );
  });
});
