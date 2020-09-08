const POINTS = 64;
const METERS_PER_KILOMETER = 1000;
const KILOMETERS_PER_LAT_DEGREE = 110.574;

export const getCirclePoints = (center, radiusInMeters) => {
  const [lon, lat] = center;

  const radiusInKm = radiusInMeters / METERS_PER_KILOMETER;

  const distanceX = radiusInKm / (
    111.320 * Math.cos(lat * Math.PI / 180)
  );
  const distanceY = radiusInKm / KILOMETERS_PER_LAT_DEGREE;

  return [...Array(POINTS)].map((_, point) => {
    const degree = (point / POINTS) * (2 * Math.PI);
    const x = distanceX * Math.cos(degree);
    const y = distanceY * Math.sin(degree);

    return [lon + x, lat + y];
  });
};
