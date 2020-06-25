import React from 'react';
import PropTypes from 'prop-types';

import {
  PIN_MARKER_GREEN,
  PIN_MARKER_BASE,
  PIN_MARKER_ORANGE,
  PIN_MARKER_YELLOW,
  PIN_MARKER_RED,
  PIN_MARKER_GRAY,
  PIN_MARKER_BLUE,
} from './constants';

import Marker from '../marker';


const PinMarker = ({
  children,
  type,
  ...rest
}) => (
  <Marker {...rest}>
    <img src={`/images/map/pin-${type}.svg`} alt="" />
    {children}
  </Marker>
);

PinMarker.defaultProps = {
  type: PIN_MARKER_GRAY,
};

PinMarker.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf([
    PIN_MARKER_GREEN,
    PIN_MARKER_BASE,
    PIN_MARKER_ORANGE,
    PIN_MARKER_YELLOW,
    PIN_MARKER_RED,
    PIN_MARKER_GRAY,
    PIN_MARKER_BLUE,
  ]),
};

export default PinMarker;
