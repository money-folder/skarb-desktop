import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { DesktopWhistoryResponse } from '../types/whistory';

export const useWhistory = (
  walletId: string,
): UseQueryResult<DesktopWhistoryResponse[]> => {
  return useQuery<DesktopWhistoryResponse[]>({
    queryKey: [`whistory-${walletId}`],
    queryFn: () => window.electron.ipcRenderer.whistory.list(walletId),
  });
};
