import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { DesktopWalletResponse } from '../types/wallets';

export const useWallets = (): UseQueryResult<DesktopWalletResponse[]> => {
  return useQuery<DesktopWalletResponse[]>({
    queryKey: ['wallets'],
    queryFn: () => window.electron.ipcRenderer.wallets.list(),
  });
};

export const useWallet = (
  walletId: string,
): UseQueryResult<DesktopWalletResponse | null> => {
  const queryClient = useQueryClient();

  return useQuery<DesktopWalletResponse | null>({
    queryKey: [`wallets-${walletId}`],
    queryFn: () => {
      const wallets = queryClient.getQueryData<DesktopWalletResponse[]>([
        'wallets',
      ]);

      return wallets?.find((wallet) => wallet.id === Number(walletId)) || null;
    },
  });
};

interface CreateWalletParams {
  name: string;
  currencyId: string;
}

export const useCreateWallet = (): UseMutationResult<
  void,
  unknown,
  CreateWalletParams,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, currencyId }) => {
      return window.electron.ipcRenderer.wallets.create(name, currencyId);
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['wallets'],
      });
    },
  });
};

export const useSoftDeleteWallet = (): UseMutationResult<
  void,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (walletId) => {
      return window.electron.ipcRenderer.wallets.softDelete(walletId);
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['wallets'],
      });
    },
  });
};
