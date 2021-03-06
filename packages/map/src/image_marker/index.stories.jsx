import { text } from '@root/.preview/src/modules/knobs';
import config from '@root/config';
import data from '../../sample_data';

import ImageMarker from './index';
import Map from '../map';

export default { title: 'ImageMarker', component: ImageMarker };

export const Default = () => (
  <Map credentials={config.map_credentials}>
    <ImageMarker
      position={data.markers[0]}
      image={text('Image url', 'https://gmsrp.cachefly.net/images/19/08/03/63a73e3358b5c718951812d991d8b6f4/960.jpg')}
      caption={text('Caption', 'Thierry Henry')}
    />
  </Map>
);
