import { useEffect, useMemo, useState } from 'react';
import { number } from '@root/.preview/src/modules/knobs';
import config from '@root/config';
import transformRotate from '@turf/transform-rotate';
import circle from '@turf/circle';
import Polygon from '../polygon';
import Circle from '../circle';
import data from '../../sample_data';
import { CIRCLE_ACTIVE, POLYGON_ACTIVE } from '..';
import Map from '../map';

export default { title: 'Performance' };

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
          key={area.toString()}
          area={area}
          type={POLYGON_ACTIVE}
        />
      ))}
      {circles.map((center) => (
        <Circle key={center.toString()} radius={50} type={CIRCLE_ACTIVE} center={center} />
      ))}
    </Map>
  );
};

export const PolygonSourceChange = () => {
  const [angle, setAngle] = useState('0');
  const circlePoints = number('Circle points', 20, {
    range: true, min: 4, max: 100, step: 1,
  });
  const rate = number('Rotation time (in ms)', 5000, {
    range: true, min: 50, max: 6000, step: 10,
  });
  const precision = number('Angle precision', 1, {
    range: true, min: 0, max: 9, step: 1,
  });

  const basePoly = useMemo(
    () => circle(data.markers[0], 0.5, { steps: circlePoints }),
    [circlePoints],
  );

  const rotatedPoly = useMemo(
    () => transformRotate(basePoly, parseFloat(angle)),
    [angle],
  );

  useEffect(() => {
    const request = requestAnimationFrame((time) => {
      const newAngle = ((time % rate) * 360) / rate;
      setAngle(newAngle.toFixed(precision));
    });

    return () => cancelAnimationFrame(request);
  });

  return (
    <Map credentials={config.map_credentials}>
      <Polygon
        area={rotatedPoly.geometry.coordinates[0]}
        type={POLYGON_ACTIVE}
      />
    </Map>
  );
};
