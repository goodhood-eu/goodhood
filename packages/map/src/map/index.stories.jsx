import React from 'react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import data from '../../sample_data';

import { POLYGON_SOLID } from '../polygon/constants';

import Map from './index';
import Polygon from '../polygon';
import { MAP_CREDENTIALS } from '../story_utils';

export default { title: 'Map', component: Map, decorators: [withKnobs] };

export const Default = () => {
  const locked = boolean('Locked', false);
  const lockedMobile = boolean('Locked on mobile', false);
  const animate = boolean('Animate', false);
  const noAttribution = boolean('Hide attribution', false);
  const boundsIndex = select('Bounds index', [0, 1], 0);
  const bounds = data.polygons[boundsIndex];

  return (
    <Map
      {...{ bounds, locked, lockedMobile, animate, noAttribution }}
      credentials={MAP_CREDENTIALS}
      onLoad={action('Map loaded')}
    />
  );
};

export const ViewAndZoom = () => (
  <Map
    credentials={MAP_CREDENTIALS}
    defaultView={data.markers[1]}
    defaultZoom={15}
  />
);

export const AutoFit = () => (
  <Map credentials={MAP_CREDENTIALS}>
    <Polygon area={data.polygons[0]} type={POLYGON_SOLID} />
    <Polygon area={data.polygons[1]} type={POLYGON_SOLID} />
  </Map>
);
