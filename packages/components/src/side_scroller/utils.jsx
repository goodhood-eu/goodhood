const easeInOutCubic = (pos) => {
  if (pos < .5) return 4 * (pos ** 3);
  return ((pos - 1) * ((2 * pos) - 2) * ((2 * pos) - 2)) + 1;
};

export const getAnimationPosition = (startPosition, targetPosition, elapsedTime, duration) => {
  const positionInTime = Math.min(elapsedTime / duration, 1);
  const easing = easeInOutCubic(positionInTime);
  return startPosition + Math.floor((targetPosition - startPosition) * easing);
};
