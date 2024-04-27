const {
  selectWalletsWithLatestWh,
  insertWallet,
  deleteWalletSoft,
  restoreWallet,
  deleteWalletHard,
} = require('../../../database/repositories/wallet-repository');
const {
  formatWalletWithLatestWhFromDb,
} = require('../../../formatters/wallets-formatter');

const listWallets = async () => {
  const wallets = await selectWalletsWithLatestWh();
  return wallets.map(formatWalletWithLatestWhFromDb);
};

const createWallet = async (event, name, currencyId) => {
  await insertWallet({ wallet: name, currencyId });
};

const softDeleteWallet = async (event, walletId) => {
  await deleteWalletSoft(walletId);
};

const handleRestoreWallet = async (event, walletId) => {
  await restoreWallet(walletId);
};

const handleHardDeleteWallet = async (event, walletId) => {
  await deleteWalletHard(walletId);
};

module.exports = {
  listWallets,
  createWallet,
  softDeleteWallet,
  handleRestoreWallet,
  handleHardDeleteWallet,
};
