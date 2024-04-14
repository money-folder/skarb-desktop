const {
  selectWalletHistory,
} = require('../../../database/repositories/whistory-repository');
const {
  formatWhistoryFromDb,
} = require('../../../formatters/whistory-formatter');

async function getWhistory(event, walletId) {
  // I don't like it because it makes handler know the column name :/
  const rawWhistory = await selectWalletHistory(walletId, {
    orderBy: 'wh_createdAt',
    orderDirection: 'desc',
  });

  return rawWhistory.map(formatWhistoryFromDb);
}

module.exports = {
  getWhistory,
};
