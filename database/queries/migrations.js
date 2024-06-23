const createMigrationsTableSQL = `
  CREATE TABLE migrations (
    id TEXT PRIMARY KEY,
    title INTEGER UNIQUE NOT NULL,
    created_at DATETIME DEFAULT (DATETIME('now', 'utc'))
  );

  insert into migrations (title) values (1);
`;

const createWalletsTablesSQL = `
  CREATE TABLE wallets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      currency TEXT NOT NULL,
      created_at DATETIME DEFAULT (DATETIME('now', 'utc')),
      updated_at DATETIME DEFAULT (DATETIME('now', 'utc')),
      deleted_at DATETIME DEFAULT NULL
  );

  CREATE TABLE wallets_history (
      id TEXT PRIMARY KEY,
      wallet_id INTEGER NOT NULL,
      money_amount REAL NOT NULL,
      date DATETIME DEFAULT (DATETIME('now', 'utc')),
      created_at DATETIME DEFAULT (DATETIME('now', 'utc')),
      updated_at DATETIME DEFAULT (DATETIME('now', 'utc')),
      deleted_at DATETIME DEFAULT NULL
  );

  insert into migrations (title) values (2);
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
