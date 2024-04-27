const {
  selectWalletsWithLatestWh,
  insertWallet,
} = require('../../../database/repositories/wallet-repository');
const {
  formatWalletWithLatestWhFromDb,
} = require('../../../formatters/wallets-formatter');

const listWallets = async () => {
  const wallets = await selectWalletsWithLatestWh();
  return wallets.map(formatWalletWithLatestWhFromDb);
};

const createWallet = async (event, name, currencyId) => {
  console.log({ wallet: name, currencyId });
  await insertWallet({ wallet: name, currencyId });
};

module.exports = {
  listWallets,
  createWallet,
};
