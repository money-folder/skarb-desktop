const crypto = require('node:crypto');

const { getDatabaseConnection, runSQL, allSQL } = require('../db');

const insertWallet = async ({ wallet, currencyId }) => {
  const db = await getDatabaseConnection();

  const newEntryId = crypto.randomUUID();

  await runSQL(
    db,
    `INSERT INTO wallets (w_id, w_name, w_currencyId) VALUES ('${newEntryId}', '${wallet}', '${currencyId}')`,
  );

  const latestInserted = await allSQL(
    db,
    `SELECT * FROM wallets ORDER BY w_createdAt DESC LIMIT 1`,
  );

  return latestInserted;
};

const deleteWalletSoft = async (id) => {
  const db = await getDatabaseConnection();

  await runSQL(
    db,
    `UPDATE wallets SET w_deletedAt = DATETIME('now') WHERE w_id = '${id}'`,
  );

  const updatedWallet = await allSQL(
    db,
    `SELECT * FROM wallets WHERE w_id = '${id}'`,
  );

  return updatedWallet;
};

const restoreWallet = async (id) => {
  const db = await getDatabaseConnection();

  await runSQL(
    db,
    `UPDATE wallets SET w_deletedAt = null WHERE w_id = '${id}'`,
  );

  const updatedWallet = await allSQL(
    db,
    `SELECT * FROM wallets WHERE w_id = '${id}'`,
  );

  return updatedWallet;
};

const deleteWalletHard = async (id) => {
  const db = await getDatabaseConnection();

  const walletToDelete = await allSQL(
    db,
    `SELECT * FROM wallets WHERE w_id = '${id}'`,
  );

  await runSQL(db, `DELETE FROM wallets WHERE w_id = '${id}'`);

  return walletToDelete;
};

const selectWallets = async () => {
  const db = await getDatabaseConnection();

  const wallets = await allSQL(
    db,
    `SELECT * FROM wallets LEFT JOIN currencies ON currencies.c_id = wallets.w_currencyId ORDER BY w_id`,
  );

  return wallets;
};

const selectWalletsWithLatestWh = async () => {
  const db = await getDatabaseConnection();

  const wallets = await allSQL(
    db,
    `
    SELECT *
    FROM wallets
    LEFT JOIN currencies ON currencies.c_id = wallets.w_currencyId
    LEFT JOIN (
      SELECT *, max(wh_createdAt)
      FROM wallets_history
      WHERE wh_deletedAt IS NULL
      GROUP BY wh_walletId
    ) wh ON wallets.w_id = wh.wh_walletid
    ORDER BY w_id;
    `,
  );

  return wallets;
};

const selectWalletById = async (id) => {
  const db = await getDatabaseConnection();

  const wallet = await allSQL(
    db,
    `SELECT * FROM wallets WHERE w_id = '${id}' LIMIT 1`,
  );

  return wallet;
};

const selectWalletsByCurrencyId = async (currencyId) => {
  const db = await getDatabaseConnection();

  const wallets = await allSQL(
    db,
    `SELECT * FROM wallets WHERE w_currencyId = '${currencyId}'`,
  );

  return wallets;
};

const selectWalletsByNameCaseInsensitive = async (name) => {
  const db = await getDatabaseConnection();

  const wallets = await allSQL(
    db,
    `SELECT * FROM wallets WHERE LOWER(w_name) = LOWER('${name}')`,
  );

  return wallets;
};

module.exports = {
  insertWallet,
  deleteWalletSoft,
  deleteWalletHard,
  selectWallets,
  selectWalletsWithLatestWh,
  selectWalletById,
  selectWalletsByCurrencyId,
  selectWalletsByNameCaseInsensitive,
  restoreWallet,
};
