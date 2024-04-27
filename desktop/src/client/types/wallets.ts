export interface Wallet {
  id: number;
  name: string;
  currency: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface DesktopWalletResponse extends Wallet {
  latestBalance: number | null;
  latestBalanceTs: string | null;
}
