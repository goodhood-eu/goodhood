export const applyPaint = (map, layerId, paint) => {
  Object.keys(paint).forEach((key) => {
    map.setPaintProperty(layerId, key, paint[key]);
  });
};

export const resetPaint = (map, layerId, paint) => {
  Object.keys(paint).forEach((key) => {
    map.setPaintProperty(layerId, key, null);
  });
};

export const setCursor = (map, cursor) => {
  map.getCanvas().style.cursor = cursor;
};
