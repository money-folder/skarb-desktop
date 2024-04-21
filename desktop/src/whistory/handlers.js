const {
  selectWalletHistory,
  insertWhistory,
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

module.exports = {
  getWhistory,
  addWhistory,
};
