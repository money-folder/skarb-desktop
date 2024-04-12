import { create } from 'zustand';

interface ActiveWalletStore {
  activeWalletId: string | null;
  setActiveWalletId: (walletId: string | null) => void;
}

export const useActiveWalletStore = create<ActiveWalletStore>()((set) => ({
  activeWalletId: null,

  setActiveWalletId: (walletId) =>
    set(() => ({
      activeWalletId: walletId,
    })),
}));
