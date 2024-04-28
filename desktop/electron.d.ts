interface Wallet {
  id: number;
  name: string;
  currency: string;
  createdAt: string;
  deletedAt: string | null;
}

interface DesktopWalletResponse extends Wallet {
  latestBalance: number | null;
  latestBalanceTs: string | null;
}

// TODO: remove duplication with whistory.ts
interface DesktopWhistoryResponse {
  id: number;
  amount: number;
  date: string;
  wallet: string;
  walletId: number;
  deletedAt: string | null;
}

interface Currency {
  id: string;
  name: string;
  createdAt: string;
  deletedAt: string | null;
}

interface Window {
  electron: {
    ipcRenderer: {
      connection: {
        getDbSources: () => Promise<string[]>;
        addDbSource: (filePath: string) => Promise<string[]>;
        deleteDbSource: (filePath: string) => Promise<string[]>;
        connectToDb: (filePath: string) => Promise<void>;
        getCurrentConnection: () => Promise<string | null>;
      };

      currencies: {
        list: () => Promise<Currency[]>;
      };

      wallets: {
        list: () => Promise<DesktopWalletResponse[]>;
        create: (name: string, currencyId: string) => Promise<void>;
        softDelete: (walletId: string) => Promise<void>;
        hardDelete: (walletId: string) => Promise<void>;
        restore: (walletId: string) => Promise<void>;
      };

      whistory: {
        list: (walletId: string) => Promise<DesktopWhistoryResponse[]>;
        add: (walletId: string, amount: number, ts: number) => Promise<void>;
        softDelete: (walletId: string) => Promise<void>;
        hardDelete: (walletId: string) => Promise<void>;
        restore: (walletId: string) => Promise<void>;
      };
    };
  };
}
