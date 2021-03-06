import { text } from '@root/.preview/src/modules/knobs';
import config from '@root/config';
import data from '../../sample_data';

import EyeCatcherMarker from './index';
import Map from '../map';


export default { title: 'EyeCatcherMarker', component: EyeCatcherMarker };

export const Default = () => (
  <Map credentials={config.map_credentials}>
    <EyeCatcherMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</EyeCatcherMarker>
  </Map>
);
