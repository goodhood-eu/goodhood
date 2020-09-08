import React from 'react';
import PropTypes from 'prop-types';
import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';
import Polygon from '../polygon';
import { getCirclePoints } from './utils';

const Circle = ({
  center,
  radius,
  ...rest
}) => <Polygon {...rest} area={getCirclePoints(center, radius)} />;

Circle.propTypes = {
  type: PropTypes.oneOf([
    CIRCLE_ACTIVE,
    CIRCLE_DEFAULT,
  ]).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  radius: PropTypes.number.isRequired,
};

export default Circle;
