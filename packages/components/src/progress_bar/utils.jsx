export const getPercentageString = (input) => {
  if (typeof input === 'number' && input < 1) return `${input}%`;
  if (`${input}`.includes('%')) return `${input}`;
  return `${input}%`;
};
