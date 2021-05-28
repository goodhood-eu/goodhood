import { number, select } from '@root/.preview/src/modules/knobs';
import config from '@root/config';
import data from '../../sample_data';

import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';

import Circle from './index';
import Map from '../map';


const types = [
  CIRCLE_ACTIVE,
  CIRCLE_DEFAULT,
];

export default { title: 'Circle', component: Circle };

export const Default = () => {
  const type = select('Type', types, types[0]);
  const radius = number('Radius (in meters)', 100, {
    range: true, min: 100, max: 5000, step: 10,
  });

  return (
    <Map credentials={config.map_credentials}>
      <Circle
        center={data.markers[0]}
        radius={radius}
        type={type}
      />
    </Map>
  );
};
