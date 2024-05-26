const path = require("node:path");
const fs = require("node:fs/promises");

const sqlite3 = require("sqlite3");
const {
  setDatabaseConnection,
  allSQL,
  getDatabaseConnection,
} = require("../db");

(async () => {
  await setDatabaseConnection(path.join(__dirname, "../skarb.sqlite3"));

  const db = await getDatabaseConnection();
  const migrations = await allSQL(db, `select * from migrations`);
  const currencies = await allSQL(db, `select * from currencies`);
  const wallets = await allSQL(db, `select * from wallets`);
  const whistory = await allSQL(db, `select * from wallets_history`);

  await fs.writeFile(
    path.join(__dirname, "./data.json"),
    JSON.stringify({
      migrations,
      currencies,
      wallets,
      whistory,
    })
  );
})();
