import { useMemo } from 'react';
import { getPopperOptions } from './utils';

export const usePopperOptions = (arrowElement, selectedType) => useMemo(
  () => getPopperOptions(arrowElement, selectedType),
  [arrowElement, selectedType],
);
