import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { DesktopWalletResponse } from '../types/wallets';

export const useWallets = (): UseQueryResult<DesktopWalletResponse[]> => {
  return useQuery<DesktopWalletResponse[]>({
    queryKey: ['wallets'],
    queryFn: () => window.electron.ipcRenderer.wallets.list(),
  });
};
