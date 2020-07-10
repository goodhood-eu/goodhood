import { assert } from 'chai';
import { getGeoJSON } from './utils';


describe('circle/utils', () => {
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
