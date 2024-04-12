import {
  UseQueryResult,
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
