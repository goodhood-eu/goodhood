import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getFillPaint, getLinePaint, getTypeProp, getGeoJSON } from './utils';
import { useChildrenBounds } from '../map/hooks';
import Layer from '../layer';


const Polygon = (props) => {
  const {
    type,
    area,
    onClick,
  } = props;

  useChildrenBounds(area);
  const source = useMemo(() => getGeoJSON(area), [area]);

  return (
    <>
      <Layer geoJsonSource={source} type="fill" paint={getFillPaint(type)} onClick={onClick} />
      <Layer geoJsonSource={source} type="line" paint={getLinePaint(type)} />
    </>
  );
};

Polygon.propTypes = {
  type: getTypeProp().isRequired,
  area: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onClick: PropTypes.func,
};

export default Polygon;
