// repositories
const {
  selectWalletsByNameCaseInsensitive,
  insertWallet,
  deleteWalletHard,
  deleteWalletSoft,
  selectWallets,
} = require('../database/repositories/wallet-repository');

const {
  selectWalletsHistoryByWalletId,
} = require('../database/repositories/whistory-repository');

// formatters
const { formatWalletFromDb } = require('../formatters/wallets-formatter');

const addWallet = async (currency, wallet) => {
  const walletsWithSameName = await selectWalletsByNameCaseInsensitive(wallet);

  if (!walletsWithSameName.length) {
    const result = await insertWallet({ wallet, currency });
    console.table(result.map(formatWalletFromDb));
  } else {
    console.error('Wallet name is not unique. Please choose another one.');
    console.table(walletsWithSameName.map(formatWalletFromDb));
  }
};

const removeWallet = async (walletId, hard = false) => {
  const relatedWhistoryEntries = await selectWalletsHistoryByWalletId(walletId);

  if (!relatedWhistoryEntries.length) {
    let deletedWallet = {};
    if (hard) {
      deletedWallet = await deleteWalletHard(walletId);
    } else {
      deletedWallet = await deleteWalletSoft(walletId);
    }

    console.table(deletedWallet.map(formatWalletFromDb));
  } else {
    console.error(`Wallet with id ${walletId} has related whistory entries!`);
    console.table(relatedWhistoryEntries);
  }
};

const listWallets = async () => {
  const wallets = await selectWallets();
  console.table(wallets.map(formatWalletFromDb));
};

module.exports = {
  addWallet,
  removeWallet,
  listWallets,
};
