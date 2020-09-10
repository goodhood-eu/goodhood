import { assert } from 'chai';
import { getGeoJSON, getPixels } from './utils';

const getMeterPerPixel = (pixelPerMeter) => 1 / pixelPerMeter;

describe('circle/utils', () => {
  it('getPixels', () => {
    // compare with table at https://docs.mapbox.com/help/glossary/zoom-level/
    const PRECISION = 0.1;

    assert.approximately(getMeterPerPixel(getPixels(0, 1, 0)), 78271.484, PRECISION);
    assert.approximately(getMeterPerPixel(getPixels(0, 1, 22)), 0.019, PRECISION);
    assert.approximately(getMeterPerPixel(getPixels(40, 1, 0)), 59959.436, PRECISION);
    assert.approximately(getMeterPerPixel(getPixels(40, 1, 10)), 58.554, PRECISION);
  });

  describe('getGeoJSON', () => {
    it('generate geojson of circle', () => {
      assert.deepEqual(getGeoJSON([1, 2]), {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [1, 2],
          },
        },
      });
    });
  });
});
