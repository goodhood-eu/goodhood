import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useMapContext } from '../map/hooks';
import { useID } from '../hooks';


const Layer = ({
  type,
  paint,
  geoJsonSource,
  onClick,
}) => {
  const { map } = useMapContext();
  const layerId = useID();

  useEffect(() => {
    if (!map) return;

    let isDestroyed = false;
    map.on('remove', () => { isDestroyed = true; });

    map.addLayer({
      type,
      paint,
      source: geoJsonSource,
      id: layerId,
    });

    if (onClick) map.on('click', layerId, onClick);

    return () => {
      if (map && !isDestroyed) {
        map.removeLayer(layerId);
        map.removeSource(layerId);
        map.off('click', layerId, onClick);
      }
    };
  }, [map, paint, onClick]);

  return null;
};

Layer.propTypes = {
  type: PropTypes.string.isRequired,
  paint: PropTypes.object.isRequired,
  geoJsonSource: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Layer;
