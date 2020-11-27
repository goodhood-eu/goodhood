import PropTypes from 'prop-types';
import pinBase01 from './images/pin-base-01.svg';
import pinBlue01 from './images/pin-blue-01.svg';
import pinGray04 from './images/pin-gray-04.svg';
import pinGreen02 from './images/pin-green-02.svg';
import pinOrange01 from './images/pin-orange-01.svg';
import pinRed01 from './images/pin-red-01.svg';
import pinYellow01 from './images/pin-yellow-01.svg';

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


const TYPES = [
  PIN_MARKER_GREEN,
  PIN_MARKER_BASE,
  PIN_MARKER_ORANGE,
  PIN_MARKER_YELLOW,
  PIN_MARKER_RED,
  PIN_MARKER_GRAY,
  PIN_MARKER_BLUE,
];

const IMAGE_MAP = {
  [PIN_MARKER_GREEN]: pinGreen02,
  [PIN_MARKER_BASE]: pinBase01,
  [PIN_MARKER_ORANGE]: pinOrange01,
  [PIN_MARKER_YELLOW]: pinYellow01,
  [PIN_MARKER_RED]: pinRed01,
  [PIN_MARKER_GRAY]: pinGray04,
  [PIN_MARKER_BLUE]: pinBlue01,
};

const PinMarker = ({
  children,
  type,
  ...rest
}) => (
  <Marker {...rest}>
    <img src={IMAGE_MAP[type]} alt={type} />
    {children}
  </Marker>
);

PinMarker.defaultProps = {
  type: PIN_MARKER_GRAY,
};

PinMarker.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(TYPES),
};

export default PinMarker;
