import PropTypes from 'prop-types';
import { useID } from '../hooks';
import { useLayerClick, useLayer, useLayerPaint, useLayerSource } from './hooks';

const Layer = ({
  type,
  paint,
  geoJsonSource,
  onClick,
}) => {
  const layerId = useID();

  useLayer(layerId, { type, paint, geoJsonSource });
  useLayerSource(layerId, geoJsonSource);
  useLayerClick(layerId, onClick);
  useLayerPaint(layerId, paint);

  return null;
};

Layer.propTypes = {
  type: PropTypes.string.isRequired,
  paint: PropTypes.object.isRequired,
  geoJsonSource: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Layer;
