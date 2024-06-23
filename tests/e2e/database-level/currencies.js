const { allSQL, getDatabaseConnection } = require('../../database/db');
const {
  insertCurrencies,
  checkIfAllItemsExist,
  execAsync,
} = require('../utils');

const expectedArrayAfterInserting = [
  {
    c_name: 'USD',
  },
  {
    c_name: 'EUR',
  },
  {
    c_name: 'PLN',
  },
];

const expectedArrayAfterRemoving = [
  {
    c_name: 'USD',
  },
  {
    c_name: 'EUR',
  },
];

const testInsertingCurrencies = async () => {
  await insertCurrencies();
  const db = await getDatabaseConnection();
  const currencies = await allSQL(db, `SELECT * FROM currencies ORDER BY c_id`);

  if (
    !checkIfAllItemsExist({
      arrayToCheck: currencies,
      referenceArray: expectedArrayAfterInserting,
      fields: ['c_name'],
    })
  ) {
    db.close();
    throw new Error('testInsertingCurrencies failed');
  }
};

const testRemovingCurrencies = async () => {
  await execAsync('skarb currencies rm -c 3 --hard');
  const db = await getDatabaseConnection();
  const currencies = await allSQL(db, `SELECT * FROM currencies ORDER BY c_id`);
  if (
    !checkIfAllItemsExist({
      arrayToCheck: currencies,
      referenceArray: expectedArrayAfterRemoving,
      fields: ['c_name'],
    })
  ) {
    db.close();
    throw new Error('testRemovingCurrencies failed');
  }
};

const testCurrencies = async () => {
  await testInsertingCurrencies();
  // await testRemovingCurrencies();
  console.log('[dbl] testCurrencies passed!');
};

module.exports = {
  testCurrencies,
  insertCurrencies,
};
