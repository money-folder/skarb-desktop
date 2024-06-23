const {
  insertWallet,
  selectWallets,
} = require('../../database/repositories/wallet-repository');

const {
  insertWhistory,
  selectWalletHistory,
} = require('../../database/repositories/whistory-repository');
const { checkIfAllItemsExist } = require('./utils');

const testInsertingWhistory = async () => {
  await insertWallet({ wallet: 'PKO Card', currency: 'PLN' });
  const [wallet] = await selectWallets();

  const referenceArray = [
    { wh_walletId: wallet.w_id, wh_moneyAmount: 100 },
    { wh_walletId: wallet.w_id, wh_moneyAmount: 200 },
    { wh_walletId: wallet.w_id, wh_moneyAmount: 300 },
  ];

  const p = referenceArray.map((wh) =>
    insertWhistory({ walletId: wh.wh_walletId, amount: wh.wh_moneyAmount }),
  );

  await Promise.all(p);

  const walletHistory = await selectWalletHistory(wallet.w_id);
  if (
    !checkIfAllItemsExist({
      arrayToCheck: walletHistory,
      referenceArray,
      fields: ['wh_walletId', 'wh_moneyAmount'],
    })
  ) {
    console.error(
      'testInsertingWhistory::',
      "arrays don't match",
      new Error().stack,
    );
  }
};

const testWhistory = async () => {
  await testInsertingWhistory();
};

module.exports = { testWhistory };
