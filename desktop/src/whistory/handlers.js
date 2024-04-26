const {
  selectWalletHistory,
  insertWhistory,
  deleteWalletHistorySoft,
  restoreWalletHistory,
  deleteWalletHistoryHard,
} = require('../../../database/repositories/whistory-repository');
const {
  formatWhistoryFromDb,
} = require('../../../formatters/whistory-formatter');
const { formatDateToSQLiteString } = require('../../../utils/utils');

async function getWhistory(event, walletId) {
  // I don't like it because it makes handler know the column name :/
  // Maybe move to the service?
  const rawWhistory = await selectWalletHistory(walletId, {
    orderBy: 'wh_createdAt',
    orderDirection: 'desc',
  });

  return rawWhistory.map(formatWhistoryFromDb);
}

async function addWhistory(event, walletId, amount, ts) {
  const date = formatDateToSQLiteString(new Date(ts));
  await insertWhistory({ walletId, amount, date });
}

async function softDeleteWhistory(event, whistoryId) {
  await deleteWalletHistorySoft(whistoryId);
}

async function restoreWhistory(event, whistoryId) {
  await restoreWalletHistory(whistoryId);
}

async function hardDeleteWhistory(event, whistoryId) {
  await deleteWalletHistoryHard(whistoryId);
}

module.exports = {
  getWhistory,
  addWhistory,
  softDeleteWhistory,
  restoreWhistory,
  hardDeleteWhistory,
};
