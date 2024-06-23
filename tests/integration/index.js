const { testWallets } = require('./wallets');
const { wrapDatabaseLevelTest } = require('./utils');

const ms2s = (ms) => ms / 1000;

(async () => {
  const startTs = performance.now();
  console.info('Tests started...');

  console.info(
    'wallets tests started in',
    `${ms2s(performance.now() - startTs)}s`,
  );
  await wrapDatabaseLevelTest(testWallets)();
  console.info(
    'wallets tests completed in',
    `${ms2s(performance.now() - startTs)}s`,
  );

  console.info('Tests completed in', `${ms2s(performance.now() - startTs)}s`);
})();
