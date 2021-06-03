import { text } from '@root/.preview/src/modules/knobs';
import config from '@root/config';
import data from '../../sample_data';

import CircleMarker from './index';
import Map from '../map';


export default { title: 'CircleMarker', component: CircleMarker };

export const Default = () => (
  <Map credentials={config.map_credentials}>
    <CircleMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</CircleMarker>
  </Map>
);
