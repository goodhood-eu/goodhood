import PropTypes from 'prop-types';
import { useID } from '../hooks';
import { applyPaint, resetPaint } from './utils';
import { useMapEffect } from './hooks';

const Layer = ({
  type,
  paint,
  geoJsonSource,
  onClick,
}) => {
  const layerId = useID();

  useMapEffect((map) => {
    map.addLayer({
      type,
      paint,
      source: geoJsonSource,
      id: layerId,
    });

    return () => {
      map.removeLayer(layerId);
      map.removeSource(layerId);
    };
  }, []);

  useMapEffect((map) => {
    if (!geoJsonSource) return;

    const source = map.getSource(layerId);
    source.setData(geoJsonSource.data);
  }, [geoJsonSource]);

  useMapEffect((map) => {
    if (!onClick) return;

    map.on('click', layerId, onClick);

    return () => {
      map.off('click', layerId, onClick);
    };
  }, [onClick]);

  useMapEffect((map) => {
    applyPaint(map, layerId, paint);

    return () => {
      resetPaint(map, layerId, paint);
    };
  }, [paint]);

  return null;
};

Layer.propTypes = {
  type: PropTypes.string.isRequired,
  paint: PropTypes.object.isRequired,
  geoJsonSource: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Layer;
