import { useMemo } from 'react';
import { getReactionsCount, getSortedReactionKeys } from './utils';

export const useReactionData = (reactions) => (
  useMemo(() => {
    const list = getSortedReactionKeys(reactions);
    const count = getReactionsCount(reactions);

    return { list, count };
  }, [reactions])
);
