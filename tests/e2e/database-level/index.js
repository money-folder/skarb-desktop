const { testCurrencies } = require('./currencies');
const { testWallets } = require('./wallets');
const { testWhistory } = require('./whistory');

const { runTest, wrapDatabaseLevelTest } = require('../utils');

const runDatabaseLevelTests = async () => {
  await runTest(wrapDatabaseLevelTest(testCurrencies));
  await runTest(wrapDatabaseLevelTest(testWallets));
  await runTest(wrapDatabaseLevelTest(testWhistory));
};

module.exports = { runDatabaseLevelTests };
