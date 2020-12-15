export const ensureValueBounds = (value, min, max) => Math.max(Math.min(value, max), min);

export const convertValueToPercent = (value, min, max) => {
  if (value) return (value - min) / (max - min);
  return 0;
};

export const convertPercentToValue = (percent, min, max, step) => {
  const multiplier = (max - min) / step;
  const value = (Math.round(percent * multiplier) * step) + min;
  return ensureValueBounds(value, min, max);
};
