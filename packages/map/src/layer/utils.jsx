export const applyPaint = (map, layerId, paint) => {
  Object.keys(paint).forEach((key) => {
    map.setPaintProperty(layerId, key, paint[key]);
  });
};

export const setCursor = (map, cursor) => {
  map.getCanvas().style.cursor = cursor;
};

export const hasLayer = (map, layerId) => (
  Boolean(map.getLayer(layerId))
);
