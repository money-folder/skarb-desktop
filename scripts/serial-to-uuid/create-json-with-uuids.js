const path = require("node:path");
const fs = require("node:fs/promises");
const crypto = require("node:crypto");

const oldData = require("./data.json");

(async () => {
  const newData = {
    migrations: [],
    currencies: [],
    wallets: [],
    whistory: [],
  };

  const migrationOldNewIdsMap = {};
  const currencyOldNewIdsMap = {};
  const walletOldNewIdsMap = {};
  const whistoryOldNewIdsMap = {};

  // migrations
  oldData.migrations.forEach((oldMigration) => {
    migrationOldNewIdsMap[oldMigration.m_id] = crypto.randomUUID();
    newData.migrations.push({
      ...oldMigration,
      m_id: migrationOldNewIdsMap[oldMigration.m_id],
    });
  });

  // currencies
  oldData.currencies.forEach((oldCurrency) => {
    currencyOldNewIdsMap[oldCurrency.c_id] = crypto.randomUUID();
    newData.currencies.push({
      ...oldCurrency,
      c_id: currencyOldNewIdsMap[oldCurrency.c_id],
    });
  });

  // wallets
  oldData.wallets.forEach((oldWallet) => {
    walletOldNewIdsMap[oldWallet.w_id] = crypto.randomUUID();
    newData.wallets.push({
      ...oldWallet,
      w_id: walletOldNewIdsMap[oldWallet.w_id],
      w_currencyId: currencyOldNewIdsMap[oldWallet.w_currencyId],
    });
  });

  // whistory
  oldData.whistory.forEach((oldWhistory) => {
    whistoryOldNewIdsMap[oldWhistory.wh_id] = crypto.randomUUID();
    newData.whistory.push({
      ...oldWhistory,
      wh_id: whistoryOldNewIdsMap[oldWhistory.wh_id],
      wh_walletId: walletOldNewIdsMap[oldWhistory.wh_walletId],
    });
  });

  await fs.writeFile(
    path.join(__dirname, "./new-data.json"),
    JSON.stringify(newData)
  );
})();
