import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Source } from 'react-mapbox-gl';
import { getFillPaint, getLinePaint, getTypeProp, getGeoJSON } from './utils';
import { useChildrenBounds } from '../map/hooks';
import { useID } from '../hooks';


const Polygon = (props) => {
  const {
    type,
    area,
    onClick,
  } = props;

  useChildrenBounds(area);

  const sourceId = useID();
  const layerId = useID();

  return (
    <>
      <Source geoJsonSource={getGeoJSON(area)} id={sourceId} />
      <Layer id={layerId} type="fill" sourceId={sourceId} paint={getFillPaint(type)} onClick={onClick} />
      <Layer type="line" sourceId={sourceId} paint={getLinePaint(type)} />
    </>
  );
};

Polygon.propTypes = {
  type: getTypeProp().isRequired,
  area: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onClick: PropTypes.func,
};

export default Polygon;
