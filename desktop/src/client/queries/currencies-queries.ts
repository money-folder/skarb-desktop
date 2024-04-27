import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { Currency } from '../types/currencies';

export const useCurrencies = (): UseQueryResult<Currency[]> => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => window.electron.ipcRenderer.currencies.list(),
  });
};
