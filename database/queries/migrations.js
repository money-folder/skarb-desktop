const createMigrationsTableSQL = `
  CREATE TABLE migrations (
    m_id TEXT PRIMARY KEY,
    m_title INTEGER UNIQUE NOT NULL,
    m_createdAt DATETIME DEFAULT (DATETIME('now', 'utc'))
  );

  insert into migrations (m_title) values (1);
`;

const createWalletsTablesSQL = `
  CREATE TABLE currencies (
      c_id TEXT PRIMARY KEY,
      c_name TEXT NOT NULL,
      c_createdAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      c_updatedAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      c_deletedAt DATETIME DEFAULT NULL
  );

  CREATE TABLE wallets (
      w_id TEXT PRIMARY KEY,
      w_name TEXT NOT NULL,
      w_currencyId INTEGER NOT NULL,
      w_createdAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      w_updatedAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      w_deletedAt DATETIME DEFAULT NULL
  );

  CREATE TABLE wallets_history (
      wh_id TEXT PRIMARY KEY,
      wh_walletId INTEGER NOT NULL,
      wh_moneyAmount REAL NOT NULL,
      wh_date DATETIME DEFAULT (DATETIME('now', 'utc')),
      wh_createdAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      wh_updatedAt DATETIME DEFAULT (DATETIME('now', 'utc')),
      wh_deletedAt DATETIME DEFAULT NULL
  );

  insert into migrations (m_title) values (2);
`;

const migrationsMap = {
  1: {
    title: 'create_migrations_table',
    sql: createMigrationsTableSQL,
  },

  2: {
    title: 'create_wallets_tables',
    sql: createWalletsTablesSQL,
  },
};

module.exports = {
  migrationsMap,
};
