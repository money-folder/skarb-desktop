import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { Currency } from '../types/currencies';

export const useCurrencies = (): UseQueryResult<Currency[]> => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => window.electron.ipcRenderer.currencies.list(),
  });
};

export const useCreateCurrency = (): UseMutationResult<
  void,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name) => {
      return window.electron.ipcRenderer.currencies.create(name);
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['currencies'],
      });
    },
  });
};

export const useSoftDeleteCurrency = (): UseMutationResult<
  void,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (currencyId) => {
      return window.electron.ipcRenderer.currencies.softDelete(currencyId);
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['currencies'],
      });
    },
  });
};
