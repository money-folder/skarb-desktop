const {
  insertWallet,
  selectWallets,
  deleteWalletHard,
} = require('../../database/repositories/wallet-repository');
const { checkIfAllItemsExist } = require('./utils');

const testInsertingWallets = async () => {
  const referenceArray = [
    { w_name: 'PKO Card', w_currency: 'PLN' },
    { w_name: 'PKO Savings', w_currency: 'PLN' },
    { w_name: 'Cash $$$', w_currency: 'USD' },
  ];

  const p = referenceArray.map((w) =>
    insertWallet({ wallet: w.w_name, currency: w.w_currency }),
  );

  await Promise.all(p);

  const wallets = await selectWallets();

  if (
    !checkIfAllItemsExist({
      arrayToCheck: wallets,
      referenceArray: referenceArray,
      fields: ['w_name', 'w_currency'],
    })
  ) {
    console.error(
      'testInsertingWallets::',
      "arrays don't match!",
      new Error().stack,
    );
  }
};

const testRemovingWallets = async () => {
  const walletsBefore = await selectWallets();
  console.table(walletsBefore);
  if (walletsBefore.find((wb) => wb.w_name === 'test')) {
    console.error(
      'testInsertingWallets::',
      'test wallet already exists!',
      new Error().stack,
    );
  }

  await insertWallet({ wallet: 'test', currency: 'PLN' });
  const walletsAfterCreation = await selectWallets();
  console.table(walletsAfterCreation);
  const newWallet = walletsAfterCreation.find((wb) => wb.w_name === 'test');
  if (!newWallet) {
    console.error(
      'testInsertingWallets::',
      'test wallet was not found!',
      new Error().stack,
    );
  }

  await deleteWalletHard(newWallet.w_id);

  const walletsAfterDeletion = await selectWallets();
  console.table(walletsAfterDeletion);
  if (walletsAfterDeletion.find((wb) => wb.w_name === 'test')) {
    console.error(
      'testInsertingWallets::',
      'test wallet still exists!',
      new Error().stack,
    );
  }
};

const testWallets = async () => {
  await testInsertingWallets();
  await testRemovingWallets();
};

module.exports = { testWallets };
