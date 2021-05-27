import { useState } from 'react';
import { select, withKnobs } from '@root/.preview/src/modules/knobs';
import { action } from '@root/.preview/src/modules/actions';
import config from '@root/config';
import data from '../../sample_data';

import { POLYGON_ACTIVE, POLYGON_DEFAULT, POLYGON_HIGHLIGHTED, POLYGON_SOLID, POLYGON_THIN } from './constants';

import Polygon from './index';
import Map from '../map';
import Marker from '../marker';
import Popup from '../popup';


const types = [
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT,
];

export default { title: 'Polygon', component: Polygon, decorators: [withKnobs] };

export const Default = () => {
  const type = select('Type', types, types[0]);

  return (
    <Map credentials={config.map_credentials}>
      <Polygon
        area={data.polygons[0]}
        type={type}
        onClick={action('Polygon clicked')}
      />
    </Map>
  );
};

export const WithPopup = () => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleClick = (event) => {
    const { lng, lat } = event.lngLat;
    setMarkerPosition([lng, lat]);
  };

  let marker;
  if (markerPosition) {
    marker = (
      <Marker position={markerPosition}>
        <Popup defaultOpen>Hello world!!!</Popup>
      </Marker>
    );
  }

  return (
    <Map credentials={config.map_credentials}>
      <Polygon
        area={data.polygons[0]}
        type={POLYGON_ACTIVE}
        onClick={handleClick}
      />
      {marker}
    </Map>
  );
};
