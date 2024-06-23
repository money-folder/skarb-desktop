const formatWalletFromDb = (walletData) => ({
  id: walletData.w_id,
  name: walletData.w_name,
  currency: walletData.w_currency,
});

const formatWalletWithLatestWhFromDb = (walletData) => ({
  id: walletData.w_id,
  name: walletData.w_name,
  currency: walletData.w_currency,
  latestBalance: walletData.wh_moneyAmount,
  latestBalanceTs: walletData.wh_createdAt,
  createdAt: walletData.w_createdAt,
  deletedAt: walletData.w_deletedAt,
});

module.exports = {
  formatWalletFromDb,
  formatWalletWithLatestWhFromDb,
};
