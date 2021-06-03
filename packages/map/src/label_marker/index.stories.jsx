import { text } from '@root/.preview/src/modules/knobs';
import config from '@root/config';
import data from '../../sample_data';

import LabelMarker from './index';
import Map from '../map';


export default { title: 'LabelMarker', component: LabelMarker };

export const Default = () => (
  <Map credentials={config.map_credentials}>
    <LabelMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</LabelMarker>
  </Map>
);
