const { getDatabaseConnection, allSQL } = require('../../database/db');
const {
  insertCurrencies,
  insertWallets,
  checkIfAllItemsExist,
  execAsync,
} = require('../utils');

const expectedArrayAfterInserting = [
  {
    w_name: 'WalletUSD',
    w_currencyId: 1,
  },
  {
    w_name: 'WalletEUR',
    w_currencyId: 2,
  },
  {
    w_name: 'WalletPLN',
    w_currencyId: 3,
  },
];

const expectedArrayAfterRemoving = [
  {
    w_name: 'WalletUSD',
    w_currencyId: 1,
  },
  {
    w_name: 'WalletEUR',
    w_currencyId: 2,
  },
  {
    w_name: 'WalletPLN',
    w_currencyId: 3,
  },
];

const testInsertingWallets = async () => {
  await insertCurrencies();
  await insertWallets();
  const db = await getDatabaseConnection();
  const wallets = await allSQL(db, `SELECT * FROM wallets ORDER BY w_id`);
  if (
    !checkIfAllItemsExist({
      arrayToCheck: wallets,
      referenceArray: expectedArrayAfterInserting,
      fields: ['w_name', 'w_currencyId'],
    })
  ) {
    db.close();
    throw new Error('testInsertingWallets failed');
  }
};

const testRemovingWallets = async () => {
  await execAsync('skarb wallets rm -w 3 --hard');
  const db = await getDatabaseConnection();
  const wallets = await allSQL(db, `SELECT * FROM wallets ORDER BY w_id`);
  if (
    !checkIfAllItemsExist({
      arrayToCheck: wallets,
      referenceArray: expectedArrayAfterRemoving,
      fields: ['w_name', 'w_currencyId'],
    })
  ) {
    db.close();
    throw new Error('testRemovingWallets failed');
  }
};

const testWallets = async () => {
  await testInsertingWallets();
  // await testRemovingWallets();
  console.log('[dbl] testWallets passed!');
};

module.exports = { testWallets };
