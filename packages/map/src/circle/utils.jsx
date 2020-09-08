export const getCirclePoints = (center, radiusInMeters) => {
  // TODO: refactor magic values
  const POINTS = 64;

  const [lon, lat] = center;

  const radiusInKm = radiusInMeters / 1000;

  const distanceX = radiusInKm / (
    111.320 * Math.cos(lat * Math.PI / 180)
  );
  const distanceY = radiusInKm / 110.574;

  return [...Array(POINTS)].map((_, point) => {
    const theta = (point / POINTS) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);

    return [
      lon + x,
      lat + y,
    ];
  });
};
