const path = require('node:path');
const fs = require('node:fs/promises');

const newData = require('./new-data.json');

const createMigrationsSql = (migrations) =>
  migrations
    .map(
      (m) =>
        `INSERT INTO migrations (m_id, m_title, m_createdAt) VALUES ('${m.m_id}', ${m.m_title}, '${m.m_createdAt}');`,
    )
    .join('\n');

const createCurrenciesSql = (currencies) =>
  currencies
    .map(
      (c) =>
        `INSERT INTO currencies (c_id, c_name, c_createdAt, c_updatedAt, c_deletedAt) VALUES ('${
          c.c_id
        }', '${c.c_name}', '${c.c_createdAt}', '${c.c_updatedAt}', ${
          c.c_deletedAt ? `'${c.c_deletedAt}'` : null
        });`,
    )
    .join('\n');

const createWalletsSql = (wallets) =>
  wallets
    .map(
      (w) =>
        `INSERT INTO wallets (w_id, w_name, w_currencyId, w_createdAt, w_updatedAt, w_deletedAt) VALUES ('${
          w.w_id
        }', '${w.w_name}', '${w.w_currencyId}', '${w.w_createdAt}', '${
          w.w_updatedAt
        }', ${w.w_deletedAt ? `'${w.w_deletedAt}'` : null});`,
    )
    .join('\n');

const createWhistorySql = (whistory) =>
  whistory
    .map(
      (wh) =>
        `INSERT INTO wallets_history (wh_id, wh_walletId, wh_moneyAmount, wh_date, wh_createdAt, wh_updatedAt, wh_deletedAt) VALUES ('${
          wh.wh_id
        }', '${wh.wh_walletId}', ${wh.wh_moneyAmount}, '${wh.wh_date}', '${
          wh.wh_createdAt
        }', '${wh.wh_updatedAt}', ${
          wh.wh_deletedAt ? `'${wh.wh_deletedAt}'` : null
        });`,
    )
    .join('\n');

(async () => {
  const migrationsSql = createMigrationsSql(newData.migrations);
  const currenciesSql = createCurrenciesSql(newData.currencies);
  const walletsSql = createWalletsSql(newData.wallets);
  const whistorySql = createWhistorySql(newData.whistory);

  const resultSql = [
    migrationsSql,
    currenciesSql,
    walletsSql,
    whistorySql,
  ].join('\n\n');

  await fs.writeFile(path.join(__dirname, './new-data-dump.sql'), resultSql);
})();
