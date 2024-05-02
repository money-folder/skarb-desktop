const { getDatabaseConnection, runSQL, allSQL } = require('../db');

const insertCurrency = async ({ currency }) => {
  const db = await getDatabaseConnection();

  await runSQL(db, `INSERT INTO currencies (c_name) VALUES ("${currency}")`);

  const latestInserted = await allSQL(
    db,
    `SELECT * FROM currencies ORDER BY c_createdAt DESC LIMIT 1`,
  );

  return latestInserted;
};

const deleteCurrencySoft = async (id) => {
  const db = await getDatabaseConnection();

  await runSQL(
    db,
    `UPDATE currencies SET c_deletedAt = DATETIME('now') WHERE c_id = ${id}`,
  );

  const updatedCurrency = await allSQL(
    db,
    `SELECT * FROM currencies WHERE c_id = ${id} LIMIT 1`,
  );

  return updatedCurrency;
};

const restoreCurrency = async (id) => {
  const db = await getDatabaseConnection();

  await runSQL(
    db,
    `UPDATE currencies SET c_deletedAt = null WHERE c_id = ${id}`,
  );

  const updatedCurrency = await allSQL(
    db,
    `SELECT * FROM currencies WHERE c_id = ${id} LIMIT 1`,
  );

  return updatedCurrency;
};

const deleteCurrencyHard = async (id) => {
  const db = await getDatabaseConnection();

  const currencyToDelete = await allSQL(
    db,
    `SELECT * FROM currencies WHERE c_id = ${id} LIMIT 1`,
  );

  await runSQL(db, `DELETE FROM currencies WHERE c_id = ${id}`);

  return currencyToDelete;
};

const selectCurrencies = async () => {
  const db = await getDatabaseConnection();
  const currencies = await allSQL(db, `SELECT * FROM currencies ORDER BY c_id`);
  return currencies;
};

const selectCurrencyById = async (id) => {
  const db = await getDatabaseConnection();

  const currency = await allSQL(
    db,
    `SELECT * FROM currencies WHERE c_id = ${id} LIMIT 1`,
  );

  return currency;
};

const selectCurrenciesByNameCaseInsensitive = async (name) => {
  const db = await getDatabaseConnection();

  const currency = await allSQL(
    db,
    `SELECT * FROM currencies WHERE LOWER(c_name) = LOWER("${name}")`,
  );

  return currency;
};

module.exports = {
  insertCurrency,
  deleteCurrencySoft,
  restoreCurrency,
  deleteCurrencyHard,
  selectCurrencies,
  selectCurrencyById,
  selectCurrenciesByNameCaseInsensitive,
};
