import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { DesktopWhistoryResponse } from '../types/whistory';

export const useWhistory = (
  walletId: string,
): UseQueryResult<DesktopWhistoryResponse[]> => {
  return useQuery<DesktopWhistoryResponse[]>({
    queryKey: [`whistory-${walletId}`],
    queryFn: () => window.electron.ipcRenderer.whistory.list(walletId),
  });
};

interface WhistoryParams {
  walletId: string;
  amount: number;
  ts: number;
}

export const addWhistory = (): UseMutationResult<
  void,
  unknown,
  WhistoryParams,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ walletId, amount, ts }) => {
      return window.electron.ipcRenderer.whistory.add(walletId, amount, ts);
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['wallets'],
      });
    },
  });
};

export const useRemoveWhistory = (
  walletId: string,
): UseMutationResult<void, unknown, string, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (whistoryId: string) =>
      window.electron.ipcRenderer.whistory.softDelete(whistoryId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`whistory-${walletId}`] });
    },
  });
};

export const useRestoreWhistory = (
  walletId: string,
): UseMutationResult<void, unknown, string, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (whistoryId: string) =>
      window.electron.ipcRenderer.whistory.restore(whistoryId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`whistory-${walletId}`] });
    },
  });
};
