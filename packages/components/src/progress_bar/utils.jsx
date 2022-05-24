export const getPercentage = (input) => {
  let percent;
  if (typeof input === 'number' && input < 1) percent = String(input * 100);
  else percent = String(input);

  if (!percent.includes('%')) percent = `${percent}%`;

  return percent;
};
