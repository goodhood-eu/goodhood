import { boolean, select, number, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import config from '@root/config';
import data from '../../sample_data';

import { POLYGON_SOLID } from '../polygon/constants';

import Map from './index';
import Polygon from '../polygon';

export default { title: 'Map', component: Map, decorators: [withKnobs] };

export const Default = () => {
  const locked = boolean('Locked', false);
  const lockedMobile = boolean('Locked on mobile', false);
  const animate = boolean('Animate', false);
  const noAttribution = boolean('Hide attribution', false);
  const boundsIndex = select('Bounds index', [0, 1], 0);
  const bounds = data.polygons[boundsIndex];
  const minZoom = number('Min zoom', undefined);
  const maxZoom = number('Max zoom', undefined);

  return (
    <Map
      {...{ bounds, locked, lockedMobile, animate, minZoom, maxZoom, noAttribution }}
      credentials={config.map_credentials}
      onLoad={action('Map loaded')}
      onBoundsChange={action('Bounds change')}
    />
  );
};

export const AutoFit = () => (
  <Map credentials={config.map_credentials}>
    <Polygon area={data.polygons[0]} type={POLYGON_SOLID} />
    <Polygon area={data.polygons[1]} type={POLYGON_SOLID} />
  </Map>
);

export const EmptyOverwriteCenterAndZoom = () => (
  <Map
    credentials={config.map_credentials}
    defaultCenter={data.pointNearPolygon1}
    defaultZoom={10.5}
    locked={false}
    onBoundsChange={action('Bounds change')}
  />
);
