import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Layer from '../layer';
import { useAddLayerBounds } from '../map/hooks';
import { getGeoJSON, getPaint } from './utils';
import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';


const Circle = ({
  type,
  center,
  radius,
}) => {
  useAddLayerBounds([center]);

  const source = useMemo(() => getGeoJSON(center), [center]);
  const paint = useMemo(() => getPaint(type, center, radius), [type, center, radius]);

  return (
    <Layer geoJsonSource={source} type="circle" paint={paint} />
  );
};

Circle.defaultProps = {
  type: CIRCLE_DEFAULT,
};

Circle.propTypes = {
  type: PropTypes.oneOf([
    CIRCLE_ACTIVE,
    CIRCLE_DEFAULT,
  ]).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  radius: PropTypes.number.isRequired,
};

export default Circle;
