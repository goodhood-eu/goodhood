import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Layer, Source } from 'react-mapbox-gl';

import { useChildrenBounds } from '../map/hooks';
import { getPaint, getGeoJSON } from './utils';
import { getID } from '../utils';
import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';


const Circle = ({
  type,
  center,
  radius,
}) => {
  const sourceId = useRef(getID()).current;
  useChildrenBounds([center]);

  return (
    <>
      <Source geoJsonSource={getGeoJSON(center)} id={sourceId} />
      <Layer type="circle" sourceId={sourceId} paint={getPaint(type, radius)} />
    </>
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
