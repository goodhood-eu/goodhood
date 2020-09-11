import React from 'react';
import { number, withKnobs } from '@storybook/addon-knobs';
import config from '@root/config';
import Map from '../map';
import Polygon from '../polygon';
import { CIRCLE_ACTIVE, POLYGON_ACTIVE } from '..';
import Circle from '../circle';

export default { title: 'Performance', decorators: [withKnobs] };

const LON_SPACE = 0.0001;
const LAT_SPACE = 0.0001;
const createPolygon = ([lon, lat], index) => {
  const lonStart = lon + (LON_SPACE * index);
  const latStart = lat + (LAT_SPACE * index);

  return [
    [lonStart, latStart],
    [lonStart + LON_SPACE, latStart],
    [lonStart + LON_SPACE, latStart + LAT_SPACE],
    [lonStart, latStart + LAT_SPACE],
    [lonStart, latStart],
  ];
};

const createCircle = ([lon, lat], index) => {
  const lonStart = lon + (LON_SPACE * index);
  const latStart = lat + (LAT_SPACE * index);

  return [lonStart, latStart];
};

export const LayerCount = () => {
  const polygonCount = number('Polygon count', 10, {});
  const circleCount = number('Circle count', 2, {});

  const polygons = [...Array(polygonCount)].map((_, index) => (
    createPolygon([14.4108009338379, 52.2681573737682], index)
  ));
  const circles = [...Array(circleCount)].map((_, index) => (
    createCircle([14.4107009338379, 52.2651573737682], index)
  ));

  return (
    <Map credentials={config.map_credentials}>
      {polygons.map((area) => (
        <Polygon
          area={area}
          type={POLYGON_ACTIVE}
        />
      ))}
      {circles.map((center) => (
        <Circle radius={50} type={CIRCLE_ACTIVE} center={center} />
      ))}
    </Map>
  );
};
