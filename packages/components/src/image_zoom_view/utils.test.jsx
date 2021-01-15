import { assert } from 'chai';
import {
  getDistanceBetweenPoints,
  getElementWidth,
  getMidpoint,
  getOffset,
  getOffsetForMovement,
  getPointDifference, getTapZoomScale, isLengthInThreshold,
} from './utils';

const getFakeElementWithBoundingRect = (rect) => ({
  getBoundingClientRect: () => rect,
});

describe('image_zoom_view/utils', () => {
  it('getDistanceBetweenPoints', () => {
    assert.closeTo(
      getDistanceBetweenPoints(
        { x: 5, y: 10 },
        { x: 30, y: 20 },
      ),
      26.92,
      0.01,
    );
  });

  it('getPointDifference', () => {
    assert.deepEqual(
      getPointDifference(
        { x: 5, y: 10 },
        { x: 30, y: 20 },
      ),
      { x: -25, y: -10 },
    );
  });

  it('getMidpoint', () => {
    assert.deepEqual(
      getMidpoint(
        { x: 5, y: 10 },
        { x: 30, y: 20 },
      ),
      { x: 17.5, y: 15 },
    );
  });

  it('getOffset', () => {
    assert.deepEqual(
      getOffset(
        { pageX: 200, pageY: 300 },
        getFakeElementWithBoundingRect({ left: 300, top: 200 }),
        getFakeElementWithBoundingRect({ left: 0, top: -150 }),
      ),
      { x: -100, y: -50 },
    );
  });

  it('getOffsetForMovement', () => {
    assert.deepEqual(
      getOffsetForMovement(
        { offsetX: 10, offsetY: 10, startTop: -10, startLeft: -20 },
        { offsetX: 15, offsetY: 15 },
      ),
      { top: -5, left: -15 },
    );
  });

  describe('getElementWidth', () => {
    it('returns undefined for empty nodes', () => {
      assert.isUndefined(getElementWidth(null));
    });

    it('returns element width', () => {
      assert.equal(
        getElementWidth(getFakeElementWithBoundingRect({ width: 666 })),
        666,
      );
    });
  });

  it('isLengthInThreshold', () => {
    assert.isTrue(isLengthInThreshold(10, 13, 3));
    assert.isTrue(isLengthInThreshold(10, 7, 3));
    assert.isFalse(isLengthInThreshold(10, 6, 3));
    assert.isFalse(isLengthInThreshold(10, 14, 3));
  });

  it('getTapZoomScale', () => {
    assert.equal(
      getTapZoomScale({ scale: 1, defaultScale: 0.5, maxScale: 3 }),
      1.5,
    );
  });
});
