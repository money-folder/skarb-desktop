const createMigrationsTableSQL = `
  CREATE TABLE migrations (
    m_id TEXT PRIMARY KEY,
    m_title TEXT UNIQUE NOT NULL,
    m_createdAt DATETIME DEFAULT (DATETIME('now', 'utc'))
  );

  insert into migrations (m_title) values ('1_create_migrations_table');
`;

const createWalletsTablesSQL = `
  CREATE TABLE wallets (
      w_id TEXT PRIMARY KEY,
      w_name TEXT NOT NULL,
      w_currency TEXT NOT NULL,
      w_createdAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      w_updatedAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      w_deletedAt DATETIME DEFAULT NULL
  );

  CREATE TABLE wallets_history (
      wh_id TEXT PRIMARY KEY,
      wh_walletId TEXT NOT NULL,
      wh_moneyAmount REAL NOT NULL,
      wh_date DATETIME DEFAULT (DATETIME('now', 'utc')),
      wh_createdAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      wh_updatedAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      wh_deletedAt DATETIME DEFAULT NULL
  );

  insert into migrations (m_title) values ('2_create_wallet_tables');
`;

const migrationsMap = {
  1: {
    title: '1_create_migrations_table',
    sql: createMigrationsTableSQL,
  },

  2: {
    title: '2_create_wallet_tables',
    sql: createWalletsTablesSQL,
  },
};

module.exports = {
  migrationsMap,
};
