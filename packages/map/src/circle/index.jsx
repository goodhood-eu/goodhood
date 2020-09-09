import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Layer from '../layer';
import { useChildrenBounds } from '../map/hooks';
import { getPaint, getGeoJSON } from './utils';
import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';


const Circle = ({
  type,
  center,
  radius,
}) => {
  useChildrenBounds([center]);

  return (
    <Layer geoJsonSource={getGeoJSON(center)} type="circle" paint={getPaint(type, center, radius)} />
  );
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
