import { assert } from 'chai';
import { getGeoJSON } from './utils';


describe('polygon/utils', () => {
  describe('getGeoJSON', () => {
    it('generate geojson of polygon', () => {
      assert.deepEqual(getGeoJSON([[1, 2]]), {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[1, 2]]],
          },
        },
      });
    });
  });
});
