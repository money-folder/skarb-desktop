const { getDatabaseConnection, runSQL, allSQL } = require('../db');

const insertWhistory = async ({ walletId, amount, date }) => {
  const db = await getDatabaseConnection();

  // the date is saved in wrong time zone
  // TODO: investigate the way SQLite saves the date
  if (date) {
    await runSQL(
      db,
      `INSERT INTO wallets_history (wh_walletId, wh_moneyAmount, wh_date) VALUES (${walletId}, ${amount}, '${date}')`,
    );
  } else {
    await runSQL(
      db,
      `INSERT INTO wallets_history (wh_walletId, wh_moneyAmount) VALUES (${walletId}, ${amount})`,
    );
  }

  const newWhistoryEntry = allSQL(
    db,
    `SELECT * FROM wallets_history WHERE wh_walletId = ${walletId} ORDER BY wh_id DESC LIMIT 1`,
  );

  return newWhistoryEntry;
};

const deleteWalletHistorySoft = async (id) => {
  const db = await getDatabaseConnection();

  await runSQL(
    db,
    `UPDATE wallets_history SET wh_deletedAt = DATETIME('now') WHERE wh_id = ${id}`,
  );

  const updatedWalletHistory = await allSQL(
    db,
    `SELECT * FROM wallets_history WHERE wh_id = ${id}`,
  );

  return updatedWalletHistory;
};

const restoreWalletHistory = async (id) => {
  const db = await getDatabaseConnection();

  await runSQL(
    db,
    `UPDATE wallets_history SET wh_deletedAt = null WHERE wh_id = ${id}`,
  );

  const updatedWalletHistory = await allSQL(
    db,
    `SELECT * FROM wallets_history WHERE wh_id = ${id}`,
  );

  return updatedWalletHistory;
};

const deleteWalletHistoryHard = async (id) => {
  const db = await getDatabaseConnection();

  const walletHistoryToDelete = await allSQL(
    db,
    `SELECT * FROM wallets_history WHERE wh_id = ${id}`,
  );

  await runSQL(db, `DELETE FROM wallets_history WHERE wh_id = ${id}`);

  return walletHistoryToDelete;
};

const selectWalletsHistory = async () => {
  const db = await getDatabaseConnection();

  const whistory = await allSQL(
    db,
    `SELECT * FROM wallets_history INNER JOIN wallets on wallets.w_id = wallets_history.wh_walletId ORDER BY wh_date DESC`,
  );

  return whistory;
};

const selectWalletsHistoryByWalletId = async (walletId) => {
  const db = await getDatabaseConnection();

  const whistory = await allSQL(
    db,
    `SELECT * FROM wallets_history WHERE wh_walletId = ${walletId}`,
  );

  return whistory;
};

const selectWalletHistory = async (
  walletId,
  { orderBy, orderDirection } = {},
) => {
  const db = await getDatabaseConnection();

  const query = `
    SELECT * FROM wallets_history
    INNER JOIN wallets on wallets.w_id = wallets_history.wh_walletId
    WHERE wh_walletId = ${walletId}
    ${orderBy ? `ORDER BY ${orderBy} ${orderDirection || ''}` : ''}
  `;

  const whistory = await allSQL(db, query);

  return whistory;
};

module.exports = {
  insertWhistory,
  deleteWalletHistorySoft,
  deleteWalletHistoryHard,
  selectWalletsHistory,
  selectWalletsHistoryByWalletId,
  selectWalletHistory,
  restoreWalletHistory,
};
