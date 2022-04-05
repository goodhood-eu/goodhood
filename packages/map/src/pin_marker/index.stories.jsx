import { select } from '@root/.preview/src/modules/knobs';
import { action } from '@root/.preview/src/modules/actions';
import config from '@root/config';
import data from '../../sample_data';

import {
  PIN_MARKER_BASE,
  PIN_MARKER_BLUE,
  PIN_MARKER_GRAY,
  PIN_MARKER_GREEN,
  PIN_MARKER_ORANGE,
  PIN_MARKER_RED,
  PIN_MARKER_YELLOW,
} from './constants';

import PinMarker from './index';
import Map from '../map';


const types = [
  PIN_MARKER_GREEN,
  PIN_MARKER_BASE,
  PIN_MARKER_ORANGE,
  PIN_MARKER_YELLOW,
  PIN_MARKER_RED,
  PIN_MARKER_GRAY,
  PIN_MARKER_BLUE,
];

export default { title: 'PinMarker', component: PinMarker };

export const Default = () => {
  const type = select('Type', types, types[0]);

  return (
    <Map credentials={config.map_credentials}>
      <PinMarker
        position={data.markers[0]}
        type={type}
        onClick={action('Marker clicked')}
      />
    </Map>
  );
};
