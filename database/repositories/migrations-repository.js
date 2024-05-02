const { getDatabaseConnection, allSQL } = require('../db');

const selectLatestMigration = async () => {
  const db = await getDatabaseConnection();

  const [latestMigration] = await allSQL(
    db,
    'SELECT * FROM migrations ORDER BY m_title DESC LIMIT 1',
  );

  return latestMigration;
};

module.exports = {
  selectLatestMigration,
};
