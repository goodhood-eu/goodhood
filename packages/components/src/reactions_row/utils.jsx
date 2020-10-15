export const getSortedReactionKeys = (reactions) => (
  Object.entries(reactions)
    .filter(([, count]) => count > 0)
    .sort(([, countA], [, countB]) => countA - countB)
    .map(([reaction]) => reaction)
);

export const getReactionsCount = (reactions) => (
  Object.values(reactions).reduce((sum, count) => sum + count, 0)
);
